
var Users = require("../Model/users");
const bcrypt = require("bcryptjs");

// Tạo mới user 
const createUser = async (user,cb) => {
    try {         
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.Password, salt,async function(err, hash) {
              if (err) throw err
                  user.Password = hash;
                  Users.create(user,cb);
            });
          });    
       } catch(e) {
      throw e
    }
  }

// Tìm kiếm user theo id 
const getUserById = async (id,cb) => {
    try {         
       Users.findById(id,cb);
    } catch(e) {
      throw e
    }
  }

// Cập nhật thông tin user
 
// Tìm kiếm user 
const getByOneUser = async (username,cb) => {
    try {         
      Users.findOne({Username: username},cb);
    } catch(e) {
      throw e
    }
  }

// 
const comparePassword = async (myPassword,hash,cb) => {
    try {         
      bcrypt.compare(myPassword,hash,(err,isMath) => {
        if(err) throw err
        cb(null, isMath)
      })
    } catch(e) {
      throw e
    }
  }

  module.exports = {
    createUser,
    getUserById,getByOneUser,
    comparePassword
  }