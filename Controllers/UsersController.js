const Users = require("../Model/users");
const jwt = require("jsonwebtoken");
const async = require("async");
const { roles } = require('../middleware/roles')

// Validator
const { isEmail } = require("../validator/EmailValidator");

const usersService = require("../Services/usersService");

module.exports = {
  // Tạo tài khoản mới
  postCreateUser : async (req, res, next) => {
    try {
      const { Username, Email, Password, Phone } = req.body
      if (!Username)
        return res.status(400) // kiểm tra Usename
          .json({
            message: "Please enter your Username",
            status: false,
            code: 0
          })
      if (Password.length < 2)  // Kiểm tra password
        return res.status(400)
          .json({
            message: "Username must be greater than 6 characters in length",
            status: false,
            code: 0
          })
      if (!Email)
        return res.status(400) // Kiểm tra Email
          .json({
            message: "Please enter your Email",
            status: false,
            code: 0
          })
      if (!isEmail(Email))
        return res.status(400) // Kiểm tra Email
          .json({
            message: "Email not format",
            status: false,
            code: 0
          })

      if (!Password)  // Kiểm tra password
        return res.status(400)
          .json({
            message: "Please enter your Password",
            status: false,
            code: 0
          })
      if (Password.length < 5)  // Kiểm tra password
        return res.status(400)
          .json({
            message: "Password must be greater than 6 characters in length",
            status: false,
            code: 0
          })


      const newUser = new Users({
        Username: req.body.Username,
        LastName: req.body.LastName,
        FirstName: req.body.FirstName,
        Password: req.body.Password,
        Phone: req.body.Phone,
        Email: req.body.Email,
        Rule: req.body.Rule ? req.body.Rule : [1]
      })

      async.parallel([
        (cb) => { 
          // kiểm tra Username
           if(Username)
             usersService.findOneUser(Username, (err, resUser) => {
               if(err) cb(err)
               else if(!resUser) cb(null, true)
               else cb(null, false)
             })
           else cb(null, true) 
       },
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
          if(err) return res.status(400).json({ message: "There was an error processing", errors: err});
          if(!results[0]) return res.status(400).json({ message: "Username already exists", status: false, code:0 });
          if(!results[1]) return res.status(400).json({ message: "Email already exists", status: false, code:0 });
          if(!results[2]) return res.status(400).json({ message: "Phone already exists", status: false, code:0 });

          usersService.createUser(newUser, (err, user) => {
            if (err) res.status(400).json({ message: "There was an error processing",errors: err, code: 0 });
            return res.send({
              message: "create user success",
              data: {
                  Username: user.Username,
                  FirstName: user.FirstName,
                  LastName: user.LastName,
                  Email: user.Email,
                  Phone: user.Phone
              },
              code: 1,
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
  postLogin : async (req, res, next) => {
    const { Username, Password } = req.body
    if (!Username) // kiểm tra Username
      return res.status(400)
        .json({
          message: "Please enter your Username",
          status: false,
          code: 0
        })

    if (!Password)  // Kiểm tra password
      return res.status(400)
        .json({
          message: "Please enter your Password",
          status: false,
          code: 0
        })

    const userLogin = {
      Username: Username,
      Password: Password,
    }
    
    try {
      usersService.findOneUser(userLogin.Username, (err, user) => {
        console.log("user");
        if (err) throw err
        if (!user) {
          return res.send({
            message: "username or password false! ",
            data: null,
            code: 0,
            status: false
          }).status(400)
        }
      
        // 
        usersService.comparePassword(userLogin.Password, user.Password, (err, isMath) => {
          if (err) throw err
          if (isMath) {
            var token = jwt.sign(user.toJSON(), process.env.secretKey || "QTData-MarketPlace", { expiresIn: process.env.TimeToken || 6000000 });
            return res.send({
              message: "login success",
              data: {
                user: {
                  Username: user.Username,
                  FirstName: user.FirstName,
                  LastName: user.LastName,
                  Email: user.Email,
                  Phone: user.Phone
                },
                token: "Bearer " + token
              },
              code: 1,
              status: true
            })
          } else {
            return res.send({
              message: "user not found and not password",
              data: null,
              code: 0,
              status: false
            }).status(400)
          }
        })

      });
    } catch (e) {
      res.send({
        message: e.message,
        errors: e.errors,
        data: null,
        code: 0,
        status: false,
      }).status(500) && next(e)
    }
  },

  // lấy thông tin user
  getProfile : async (req, res) => {
    res.send({
      code: 1,
      data: {
        user: {
          Usename: req.user.Username,
          LastName: req.user.LastName,
          Phone: req.user.Phone,
          Email: req.user.Email,
          _id: req.user._id,
        }
      },
      status: true,
    });
  },

  // Cập nhật thông tin
  postUpdate : async (req, res, next) => {
    var userUpdate = { };
      if(req.body.Username)  userUpdate.Username =  req.body.Username;
      if(req.body.LastName)  userUpdate.LastName = req.body.LastName;
      if(req.body.FirstName)  userUpdate.FirstName = req.body.FirstName;
      if(req.body.Email)  userUpdate.Email = req.body.Email;
      if(req.body.Password)  userUpdate.Password = req.body.Password;
      if(req.body.Phone)  userUpdate.Phone = req.body.Phone
      if(req.body.Avatar)  userUpdate.Avatar = req.body.Avatar
      
    var id = req.params.id;

    if (!id)return res.status(400).json({ message: "id is required", status: false, code: 0})
    if(userUpdate.Username === "") return res.status(400).json({ message: "Username not null", status: false, code: 0});
    if(userUpdate.Email === "") return res.status(400).json({ message: "Email not null",status: false, code: 0 });
    if(userUpdate.Phone === "") return res.status(400).json({ message: "Phone not null", status: false, code: 0 });
   
    usersService.findOneUserByID(id,(err,resFindUser)=>{
      if(err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false});
      if(!resFindUser) return res.status(400).json({ message: "not find user", data: null,status: false});

      async.parallel([
        (cb) => { 
          // kiểm tra Username
           if(userUpdate.Username)
             usersService.findOneUser(userUpdate.Username, (err, resUser) => {
               if(err) cb(err)
               else if(!resUser || (resUser && resUser._id.toString() === id)) cb(null, true)
               else cb(null, false)
             })
           else cb(null, true) 
       },
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
          if(err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false});
          if(!results[0]) return res.status(400).json({ message: "Username already exists", status: false, code:0 });
          if(!results[1]) return res.status(400).json({ message: "Email already exists", status: false, code:0 });
          if(!results[2]) return res.status(400).json({ message: "Phone already exists", status: false, code:0 });

          usersService.updateUser(id, userUpdate,(err,resUser) => {
            if(err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false});
            res.json({
              message: "update user success",
              data: resUser,
              status: true,
              code: 1
            });
          })
          
        });     
    })

  },

  // xóa user
  postDeleteUser: (req,res) => {
    const {id} = req.params
    if(!id) return res.status(400).json({ message: "Id is required", status: false, code: 0 })

    usersService.findOneUserByID(id,(err, resUser)=> {
      if(err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false});
      if(!resUser) return res.status(400).json({ message: "Not find user", errors: err, status: false});

      usersService.removeUserById(resUser._id, (err,resRemoveUser)=> {
        if(err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false});
        res.json({
          message: "Delete user success",
          data: resRemoveUser,
          status: true,
          code: 1
        })
      })
    })
  },
  getSearch: (req,res) => {
    const search = {
      text: req.query.search,
      limit: req.query.limit || 20,
      page: req.query.page || 1, 
    }

    search.skip = (search.page - 1)*search.limit;
    async.parallel([
      (cb) => {
        usersService.searchUsers(search, (err,data) => {
          if(err) return cb(err)
          cb(null,data)
        }) 
      },
      (cb) => {
        usersService.countUsers((err,count)=>{
          if(err) return cb(err);
          cb(null,count);
        })
      }
    ],(err,results) => {
      if(err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false});
      res.json({
        message: "search user success",
        data: {
          users: results[0],
          count: results[1]
        }
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
      message: "You don't have enough permission to perform this action",
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