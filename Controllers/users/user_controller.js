const Users = require("../../Model/users");
const jwt = require("jsonwebtoken");
const async = require("async");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// Validator
const { isEmail, isPhone } = require("../../validator/validator");

const usersService = require("../../Services/usersService");
const { error_400, error_500, success } = require("../../validator/errors");

module.exports = {
  // Tạo tài khoản mới
  post_create_user: async (req, res, next) => {
    try {
      const { FullName, Email, Password, Phone } = req.body
      if (!FullName) return error_400(res, "Vui lòng nhập vào họ tên", "FullName");

      if (!Phone || Phone === "")
        return error_400(res, "Vui lòng nhập vào sô điện thoại", "Phone");

      if (!Email || Email === "")
        return error_400(res, "Vui lòng nhập vào Email", "Email");

      if (!Password)
        return error_400(res, "Vui lòng nhập vào mật khẩu", "Password");

      if (!isPhone(Phone))
        return error_400(res, "Số điện thoại không đúng định dạng việt nam",
          "Phone");
      if (!isEmail(Email))
        return error_400(res, "Email không đúng định dạng", "Email");

      if (Password.length < 6)
        return error_400(res, "Vui lòng nhập vào mật khẩu ít nhất 6 ký tự",
          "Password");

      const newUser = new Users({
        LastName: req.body.LastName,
        FirstName: req.body.FirstName,
        Password: req.body.Password,
        Phone: req.body.Phone,
        Email: req.body.Email,
        Role: req.body.Role,
        FullName: req.body.FullName,
        Gender: req.body.Gender,
        Birthday: req.body.Birthday,
        Sale: req.body.Sale,
        Avatar: req.body.Avatar,
        Facebook: req.body.Facebook,
        Google: req.body.Google,
        // Verify: req.body.Verify,
      })

      async.parallel([
        // kiểm tra Email
        (cb) => 
          Users.findOne({ Email: Email }).exec((e, u) => e ? cb(e) : cb(null, u)),

        // kiểm tra Phone
        (cb) => 
          Users.findOne({ Phone: Phone }).exec((e, u) => e ? cb(e) : cb(null, u)),

      ], (err, results) => {
        if (err) return error_500(res, err);

        if (results[0]) return error_400(res, "Email đã được sử dụng", "Email")

        if (results[1])
          return error_400(res, "Số điện thoại đã được sử dụng", "Phone");

        usersService.createUser(newUser, (err, user) => {
          if (err) return error_500(res, err);
          success(res, "Tạo mới tài khoản thành công", user);
        });
      });

    } catch (e) {
      error_500(res, e)
    }
  },

  // Đăng nhập
  post_login: async (req, res) => {
    const { Username, Password } = req.body

    if (!Username || Username === "")
      return error_400(res, "Vui lòng nhập tên đăng nhập", "Username");

    if (!Password || Password === "")
      return error_400(res, "Vui lòng nhập mật khẩu", "Password");

    async.parallel([
      (cb) =>
        Users.findOne({ Email: Username }, (e, user) => e ? cb(e) : cb(null, user)),
      (cb) =>
        Users.findOne({ Phone: Username }, (e, user) => e ? cb(e) : cb(null, user))
    ], (err, results) => {
      if (err) return error_500(res, err);
      if (!results[0] && !results[1])
        return error_400(res, "Tên đăng nhập hoặc mật khẩu không đúng",
                              "Username or Password");

      async.waterfall([
        (cb) => {
          if (results[0]) cb(null, results[0]);
          else cb(null, results[1]);
        }
      ], (e, userTrue) => {
        if (e) error_500(res, e);
        usersService.comparePassword(Password, userTrue.Password, (err, isMath) => {
          if (err) return error_500(res, err);
          
          if (isMath) {
            var token = jwt.sign(userTrue.toJSON(), process.env.secretKey,
              { expiresIn: process.env.TimeToken || 60000000 });
            success(res,
              "Đăng nhập thành công",
              {
                user: {
                  Username: userTrue.Username,
                  FirstName: userTrue.FirstName,
                  LastName: userTrue.LastName,
                  FullName: userTrue.FullName,
                  Email: userTrue.Email,
                  Phone: userTrue.Phone,
                  Role: userTrue.Role,
                  _id: userTrue._id
                },
                token: "Bearer " + token
              })
          } else {
            return error_400(res, "Tên đăng nhập hoặc mật khẩu không đúng",
              "Username or Passowrd")
          }
        })
      })
    })
  },

  // lấy thông tin user
  get_profile: async (req, res) => {
    delete req.user.Password;
    res.send({
      code: 1,
      data: {
        user: req.user
      },
      status: true,
    });
  },

  // lấy thông tin user của tài khoản khác
  get_profile_id: async (req, res) => {
    let id = req.params.id
    
    if (!id) return error_400(res, "Vui lòng nhập id", "id");
    
    if (!mongoose.Types.ObjectId.isValid(id)) 
      return error_400(res, "Vui lòng nhập id đúng định dạng", "ObjectId");

    Users.findById(id, (e, u) => {
      if (e) return error_500(res, e);
      else if (!u) 
        return error_400(res, "Không tìm thấy tài khoản người dùng", id);
      else success(res, `Lấy thông tin tài khoản ${id} thành công`, u);
    })
  },

  // Cập nhật thông tin
  post_update: async (req, res) => {
     
    if(req.body.Birthday && req.body.Birthday === ""){
      return error_400(res, "Ngày sinh không được rỗng", "Birthday")
    } 
    if(req.body.Birthday && !isNaN(Date.parse(req.body.Birthday))){
      return error_400(res, "Ngày sinh phải là dạng ngày", "Birthday")
    } 
    if(req.body.Gender && (req.body.Gender !== 0 || 
        req.body.Gender !== 1 || req.body.Gender !== 2 )){
      return error_400(res, "Ngày sinh phải là dạng ngày", "Birthday")
    } 

    let userUpdate = {
      FullName: req.body.FullName ? req.body.FullName : undefined,
      Phone: req.body.Phone ? req.body.Phone : undefined,
      Email: req.body.Email ? req.body.Email : undefined,
      Passowrd: req.body.Passowrd ? req.body.Passowrd : undefined,
      Birthday: req.body.Birthday ? new Date(req.body.Birthday) : undefined,
      Gender: req.body.Gender ? req.body.Gender : undefined,
      DateUpdate: Date.now()
    };
    
    let id = req.user._id;

    if (!id || id === "") return error_400(res,"Vui lòng nhập id","id")
    
    if (userUpdate.FullName && userUpdate.FullName === "")
      return error_400(res,"Họ tên không được rỗng", "FullName");

    if (userUpdate.Phone && userUpdate.Phone === "") 
      return error_400(res,"Số điện thoại không được rỗng", "Phone");

    if (userUpdate.Phone && !isPhone(userUpdate.Phone)) 
      return error_400(res,"Số điện thoại không đúng định dạng","Phone");

    if (userUpdate.Email && userUpdate.Email === "") 
      return error_400(res,"Email không được rỗng", "Email");

    if (userUpdate.Email && !isEmail(userUpdate.Email)) 
      return error_400(res,"Email không đúng định dạng", "Email");
    if (userUpdate.Email && !isEmail(userUpdate.Email)) 
      return error_400(res,"Email không đúng định dạng", "Email");

    Users.findById(id, (err, resUser) => {
      if (err) return error_500(res,err);
      if (!resUser) return error_400(res,"Không tìm thấy người dùng", "id user");

      async.parallel([
        (cb) => {// kiểm tra Email
          if (userUpdate.Email)
            Users.findOne({Email: userUpdate.Email})
                  .exec((e, em) => e ? cb(e) : !em ? cb(null, null) 
                  : em._id === id ? cb(null, null): cb(null,em))
          else cb(null,null)
        },
        (cb) => {// kiểm tra Phone
          if (userUpdate.Phone)
            Users.findOne({Phone: userUpdate.Phone})
                .exec((e, p) => e ? cb(e) : !p ? cb(null, null) 
                : toString(p._id) === toString(id) ? cb(null, null): cb(null,p));
          else cb(null, null)
        }
      ], (err, results) => {
        if (err) return error_500(res,e)
        
        if (results[0]) return error_400(res, "Email đã được sử dụng", "Email");
        
        if (results[1]) 
          return error_400(res,"Số điện thoại đã được sử dụng", "Phone");

        async.waterfall([
          cb => {
            if(!userUpdate.Password) cb(null,userUpdate)
            else {
              bcrypt.genSalt(10, function (e, salt) {
                if(e) cb(e);
                bcrypt.hash(userUpdate.Password, salt, async function (e, hash) {
                  if(e) cb(e);
                  userUpdate.Password = hash;
                  cb(null,userUpdate)
                });
              });    
            }
          },
          (result) => {
            Users.findByIdAndUpdate(id, result,{new : true}, (e, resUser) => {
              if (e) return error_500(res,e);
              delete resUser.Password;
              success(res,"Cập nhật thông tin tài khoản thành công", resUser)
            })
          }
        ]);
      });
    })
  },

  // xóa user
  postDeleteUser: (req, res) => {
    const { id } = req.params
    if (!id) return error_400(res,"Vui lòng nhập Id","id")

    Users.findById(id, (e, resUser) => {
      if (e) return error_500(res,e);
      if (!resUser) return error_400(res,"Không tìm thấy người dùng id "+id,"id");

      Users.findByIdAndRemove(resUser._id, (err, resRemoveUser) => {
        if (err) return error_500(res,err);
        success(res,"Xóa thành công người dùng", resRemoveUser)
      })
    })
  },

  get_search: (req, res) => {
    const search = {
      text: req.query.search || "",
      limit: req.query.limit || 20,
      page: req.query.page || 1,
    }

    search.skip = (search.page - 1) * search.limit;
    async.parallel([
      (cb) => {
        Users.find()
          .exec((e, u) => e ? cb(e) : cb(null, u))
      },
      (cb) => {
        Users.count().exec((err, count) => {
          if (err) return cb(err);
          cb(null, count);
        })
      }
    ], (err, results) => {
      if (err) return error_500(res,err)
      res.json({
        message: "Danh sách người dùng",
        data: {
          users: results[0],
          count: results[1]
        }
      })
    })
  },

  // lấy tất cả user
  get_all_user: (req, res) => {
    let config = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
    }
    config.skip = (config.page - 1) * config.limit;
    async.parallel([
      (cb) => {
        Users.find()
          .skip(config.skip)
          .limit(config.limit)
          .sort({ Date: -1 })
          .exec((e, u) => e ? cb(e) : cb(null, u))
      },
      (cb) => {
        Users.count().exec((e, c) => e ? cb(e) : cb(null, c))
      }
    ], (err, results) => {
      if (err) return error_500(res,err);

      res.json({
        message: "Danh sách người dùng",
        data: {
          users: results[0],
          count: results[1]
        }
      })
    })
  },

  // xóa danh sách user
  remove_list_user: (req, res) => {
    const listId = req.body.listId;
    if (!listId || (Array.isArray(listId) && listId.length === 0)) 
      return error_400(res,"Vui lòng nhập danh sách listId","listId");

    if (!Array.isArray(listId)) 
      return error_400(res,"listId phải là array", "listId");

    Users.deleteMany({ _id: { $in: listId } }, (err, resData) => {
      if (err) return error_500(res,err);
      
      res.json({
        message: `Xóa thành công ${resData.deletedCount} người dùng`,
        data: resData,
        status: true
      })
    })
  }
  // ------------------- end --------------------------
}
