const Users = require("../Model/users");
const jwt = require("jsonwebtoken");
const async = require("async");
const bcrypt = require("bcryptjs");
const { roles } = require('../middleware/roles')

// Validator
const { isEmail,isPhone } = require("../validator/validator");

const usersService = require("../Services/usersService");

module.exports = {
  // Tạo tài khoản mới
  postCreateUser : async (req, res, next) => {
    try {
      const { FullName, Email, Password, Phone } = req.body
      if (!FullName)
        return res.status(400) // kiểm tra Usename
          .json({
            message: "Vui lòng nhập họ tên",
            status: false,
            code: 0
          })
      if (!Email)
      return res.status(400) // Kiểm tra Email
        .json({
          message: "Vui lòng nhập Email",
          status: false,
          code: 0
        })
      if (!Password)  // Kiểm tra password
      return res.status(400)
        .json({
          message: "Vui lòng nhập mật khẩu",
          status: false,
          code: 0
        })
      
  
      if (Password.length < 6)  // Kiểm tra password
        return res.status(400)
          .json({
            message: "Mật khẩu phải có ít nhất 6 ký tự",
            status: false,
            code: 0
          })
     
      if (!isEmail(Email))
        return res.status(400) // Kiểm tra Email
          .json({
            message: "Email không đúng định dạng",
            status: false,
            code: 0
          })
      if (!isPhone(Phone))
        return res.status(400) // Kiểm tra Email
          .json({
            message: "Số điện thoại không đúng định dạng",
            status: false,
            code: 0
          })

      const newUser = new Users({
        LastName: req.body.LastName,
        FirstName: req.body.FirstName,
        Password: req.body.Password,
        Phone: req.body.Phone,
        Email: req.body.Email,
        Role: req.body.Role,
        FullName: req.body.FullName,
        Gender:   req.body.Gender,
        Birthday: req.body.Birthday,
        Sale: req.body.Sale,
        Avatar: req.body.Avatar,
        Facebook: req.body.Facebook,
        Google: req.body.Google,
        // Verify: req.body.Verify,
      })

      async.parallel([
      (cb)=> {// kiểm tra Email
            if(Email)
              usersService.findEmail(Email, (err, resEmailUser) => {
                  if(err) cb(err)
                  else if(!resEmailUser) cb(null, true);
                  else cb(null, false);
                })
            else cb(null, true)
        },
      (cb)=> {// kiểm tra Phone
          if(Phone)
            usersService.findPhone(Phone, (err, resPhone) => {
                if(err) cb(err)
                else if(!resPhone) cb(null, true);
                else cb(null, false);
              });
          else cb(null, true);
        }
        ], (err, results) => {
          if(err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false});
          if(!results[0]) return res.status(400).json({ message: "Email đã được sử dụng", status: false});
          if(!results[1]) return res.status(400).json({ message: "Số điện thoại đã được sử dụng", status: false});

          usersService.createUser(newUser, (err, user) => {
            if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý",errors: err, code: 0 });
            return res.json({
              message: "Tạo tài khoản thành công",
              data: user,
              status: true
            })
          });

        });  

    } catch (e) {
      res.send({
        message: e.message,
        errors: e.errors,
        code: 0
      }).status(500) && next(e)
    }
  },

  // Đăng nhập
  postLogin : async (req, res) => {
    const { Username, Password } = req.body
    if (!Username) // kiểm tra Username
      return res.status(400)
        .json({
          message: "Vui lòng nhập tên đăng nhập",
          status: false,
          code: 0
        })

    if (!Password)  // Kiểm tra password
      return res.status(400)
        .json({
          message: "Vui lòng nhập mật khẩu",
          status: false,
          code: 0
        })

    const userLogin = {
      Username: Username,
      Password: Password,
    }
    async.parallel([
      (cb) => Users.findOne({ Email: userLogin.Username },(e, user)=> e ? cb(e) : cb(null, user)),
      (cb) => Users.findOne({ Phone: userLogin.Username },(e, user)=> e ? cb(e) : cb(null, user))
    ],(err,results) => {
      if(err) 
        return res.status(400).json({message: "Có lỗi trong quá trình xử lý", errors: err, status: false});
      
      if(!results[0] && !results[1] ) 
        return res.status(400).json({message: "Tên đăng nhập hoặc mật khẩu không đúng", status: false});

      var userTrue = results[0]
      if(!userTrue) userTrue = results[1];

      usersService.comparePassword(userLogin.Password, userTrue.Password, (err, isMath) => {
        if (err) 
          return res.status(400).json({message: "Tên đăng nhập hoặc mật khẩu không đúng", status: false, errors: "compare" });
        if (isMath) {
          var token = jwt.sign(userTrue.toJSON(), process.env.secretKey || "QTData-MarketPlace", { expiresIn: process.env.TimeToken || 60000000 });
          return res.json({
            message: "Đăng nhập thành công",
            data: {
              user: {
                Username: userTrue.Username,
                FirstName: userTrue.FirstName,
                LastName: userTrue.LastName,
                Email: userTrue.Email,
                Phone: userTrue.Phone,
                id: userTrue._id
              },
              token: "Bearer " + token
            },
            code: 1,
            status: true
          })
        } else {
          return res.json({
            message: "Tên đăng nhập hoặc mật khẩu không đúng",
            data: null,
            code: 0,
            status: false
          }).status(400)
        }
      })
    })
  },

  // lấy thông tin user
  getProfile : async (req, res) => {
    res.send({
      code: 1,
      data: {
        user: req.user
      },
      status: true,
    });
  },

  // Cập nhật thông tin
  postUpdate : async (req, res) => {
    var userUpdate = req.body;
      // if(req.body.Fullname)  userUpdate.Fullname =  req.body.Fullname;
      // if(req.body.LastName)  userUpdate.LastName = req.body.LastName;
      // if(req.body.FirstName)  userUpdate.FirstName = req.body.FirstName;
      // if(req.body.Email)  userUpdate.Email = req.body.Email;
      // if(req.body.Password)  userUpdate.Password = req.body.Password;
      // if(req.body.Phone)  userUpdate.Phone = req.body.Phone
      // if(req.body.Avatar)  userUpdate.Avatar = req.body.Avatar
      
    var id = req.params.id;

    if (!id)return res.status(400).json({ message: "Id không được rỗng", status: false, code: 0})
    if(userUpdate.FullName === "") return res.status(400).json({ message: "Họ tên không được trống", status: false, code: 0});
    if(userUpdate.Email === "") return res.status(400).json({ message: "Email không được rỗng",status: false, code: 0 });
    if(userUpdate.Phone === "") return res.status(400).json({ message: "Số điện thoại không được rỗng", status: false, code: 0 });
    if(userUpdate.Phone && !isPhone(userUpdate.Phone)) return res.status(400).json({ message: "Số điện thoại không đúng định dạng", status: false, code: 0});
    if(userUpdate.Email && !isEmail(userUpdate.Email)) return res.status(400).json({ message: "Email không đúng định dạng", status: false, code: 0});
    
    usersService.findOneUserByID(id,(err,resFindUser)=>{
      if(err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false});
      if(!resFindUser) return res.status(400).json({ message: "Không tìm thấy người dùng", data: null,status: false});

      async.parallel([
      (cb)=> {// kiểm tra Email
            if(userUpdate.Email)
              usersService.findEmail(userUpdate.Email, (err, resEmailUser) => {
                  if(err) cb(err)
                  else if(!resEmailUser || (resEmailUser && resEmailUser._id.toString()) === id) cb(null, true);
                  else cb(null, false);
                })
            else cb(null, true)
        },
      (cb)=> {// kiểm tra Phone
          if(userUpdate.Phone)
            usersService.findPhone(userUpdate.Phone, (err, resPhone) => {
                if(err) cb(err)
                else if(!resPhone || (resPhone && resPhone._id.toString() === id)) cb(null, true);
                else cb(null, false);
              });
          else cb(null, true);
        }
        ], (err, results) => {
          if(err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false});
          if(!results[0]) return res.status(400).json({ message: "Email đã được sử dụng", status: false, code:0 });
          if(!results[1]) return res.status(400).json({ message: "Phone đã được sử dụng", status: false, code:0 });

          if(userUpdate.Password){
            bcrypt.genSalt(10, function(err, salt) {
              bcrypt.hash(userUpdate.Password, salt,async function(err, hash) {
               
                userUpdate.Password = hash;
                Users.findByIdAndUpdate(id, userUpdate,(err,resUser) => {
                  if(err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false});
                  delete resUser.Password;
                  res.json({
                    message: "Cập nhật thành công",
                    data: resUser,
                    status: true,
                    code: 1
                  });
                })
              });
            });
          } else {
            usersService.updateUser(id, userUpdate,(err,resUser) => {
              if(err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false});
              res.json({
                message: "Cập nhật thành công",
                data: resUser,
                status: true,
                code: 1
              });
            })
            
          }
        });     
    })

  },

  // xóa user
  postDeleteUser: (req,res) => {
    const {id} = req.params
    if(!id) return res.status(400).json({ message: "Vui lòng nhập Id", status: false, code: 0 })

    usersService.findOneUserByID(id,(err, resUser)=> {
      if(err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false});
      if(!resUser) return res.status(400).json({ message: "Không tìm thấy người dùng", errors: err, status: false});

      usersService.removeUserById(resUser._id, (err,resRemoveUser)=> {
        if(err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false});
        res.json({
          message: "Xóa người dùng thành công",
          data: resRemoveUser,
          status: true,
          code: 1
        })
      })
    })
  },
  getSearch: (req,res) => {
    const search = {
      text: req.query.search || "",
      limit: req.query.limit || 20,
      page: req.query.page || 1, 
    }

    search.skip = (search.page - 1)*search.limit;
    async.parallel([
      (cb) => {
        Users.find()
              .exec((e,u)=>e?cb(e):cb(null,u))
      },
      (cb) => {
        usersService.countUsers((err,count)=>{
          if(err) return cb(err);
          cb(null,count);
        })
      }
    ],(err,results) => {

      if(err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false});
      res.json({
        message: "Danh sách người dùng",
        data: {
          users: results[0],
          count: results[1]
        }
      })
    })
   
   
  },

  get_all_user: (req,res) => {
    let config = {
      limit: req.query.limit || 20,
      page: req.query.page || 1, 
    }
    config.skip = (config.page - 1)*config.limit;
    async.parallel([
      (cb) => {
        Users.find()
              .skip(config.skip)
              .limit(config.limit)
              .sort({Date: -1})
              .exec((e,u) => e?cb(e):cb(null,u))
      },
      (cb) => {
        Users.count().exec((e,c)=>e?cb(e):cb(null, c))
      }
    ],(err,results) => {

      if(err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false});
      res.json({
        message: "Danh sách người dùng",
        data: {
          users: results[0],
          count: results[1]
        }
      })
    })
   
  },

  remove_list_user: (req,res) => {
    const listId = req.body.listId;
    if(!listId || (Array.isArray(listId) && listId.length === 0) ) return res.status(400).json({ message: "Vui lòng nhập danh sách listId",status: false} );
    if(!Array.isArray(listId)) return res.status(400).json({ message: "listId phải là array",status: false});

    Users.deleteMany({_id: {$in: listId}}, (err,resData)=> {
      console.log(err);
      if(err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false});

      res.json({
        message: `Xóa thành công ${resData.deletedCount} người dùng`,
        data: resData,
        status: true 
      })
    })
  }

  // ------------------- end --------------------------
}

module.exports.grantAccess = function(action, resource) {
  return async (req, res, next) => {
   try {
    const permission = roles.can(req.user.Role)[action](resource);
    if (!permission.granted) {
     return res.status(401).json({
      message: "Bạn không có quyền",
      status: false,
      code: 401
     });
    }
    next()
   } catch (error) {
    next(error)
   }
  }
 }
 
 module.exports.allowIfLoggedin = async (req, res, next) => {
  try {
   const user = res.locals.loggedInUser;
   if (!user)
    return res.status(401).json({
     error: "You need to be logged in to access this route"
    });
    req.user = user;
    next();
   } catch (error) {
    next(error);
   }
 }