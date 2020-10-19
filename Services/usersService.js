
const Users = require("../Model/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = {

  // Tạo mới user 
  createUser: async (user, cb) => {
    try {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.Password, salt, async function (err, hash) {
          if (err) {
            cb(err, null)
          }
          user.Password = hash;
          Users.create(user, cb);
        });
      });
    } catch (e) {
      throw e
    }
  },

  // kiểm tra password
  comparePassword: async (myPassword, hash, cb) => {
    try {
      bcrypt.compare(myPassword, hash, (err, isMath) => {
        if (err) throw err
        cb(null, isMath)
      })
    } catch (e) {
      throw e
    }
  },

  // Tạo token
  token_login: async (user,cb) => {
    let token = jwt.sign(user.toJSON(), process.env.secretKey,
    { expiresIn: process.env.TimeToken || 60000000 });

    cb({
      "user": {
        Username: user.Username,
        FirstName: user.FirstName,
        LastName: user.LastName,
        FullName: user.FullName,
        Birthday: user.Birthday,
        Avatar: user.Avatar,
        Email: user.Email,
        Phone: user.Phone,
        Role: user.Role,
        Facebook: user.Facebook,
        Google: user.Google,
        Zalo: user.Zalo,
        _id: user._id
      },
      token: "Bearer " + token
    })
  }

}

