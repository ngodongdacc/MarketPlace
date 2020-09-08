
var Users = require("../Model/users");

const jwt = require("jsonwebtoken")
const usersService = require("../Services/usersService");

// Tạo tài khoản mới
const postCreateUser = async (req, res, next) => {
  try {
    var newUser = new Users({
      Username: req.body.Username,
      LastName: req.body.LastName,
      FirstName: req.body.FirstName,
      Password: req.body.Password,
      Phone: req.body.Phone,
      Email: req.body.Email,
      Rule: req.body.Rule ? req.body.Rule : [1]
    })
    usersService.createUser(newUser, (err, user) => {
      if (err) {
        res.status(400).json({
          message: "There was an error processing",
          errors: err

        });
      }
      return res.send({
        message: "create user success",
        data: {
          user: {
            Username: user.Username,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            Phone: user.Phone
          }
        },
        code: 1,
        status: true
      })
    });
  } catch (e) {
    res.send({
      message: e.message,
      errors: e.errors,
      code: 0
    }).status(400) && next(e)
  }
}

// Đăng nhập
const postLogin = async (req, res, next) => {
  const userLogin = {
    Username: req.body.Username,
    Password: req.body.Password,
  }
  try {
      usersService.getByOneUser(userLogin.Username, (err, user) => {
      if (err) throw err
      if(!user) {
        return res.send({
          message: "user not found and not password",
          data: null,
          code: 0,
          status: false
        }).status(400)
      }
      
      // 
      usersService.comparePassword(userLogin.Password, user.Password, (err,isMath) => {
        if(err) throw err
        if(isMath){
          var token = jwt.sign(user.toJSON(),process.env.secretKey|| "QTData-MarketPlace", { expiresIn : process.env.TimeToken || 6000000});
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
              token:"Bearer "+ token
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
    }).status(400) && next(e)
  }
}

const getProfile = async (req,res) => {
  res.send({
    code: 1,
    data: {
        user: {
            Username: req.user.Username,
            LastName: req.user.LastName,
            Phone: req.user.Phone,
            Email: req.user.Email,
            _id: req.user._id,
        }
    },
    status: true,
  });
}
module.exports = {
  postCreateUser,postLogin,
  getProfile
}