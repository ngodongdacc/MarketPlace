
var Users = require("../Model/users");
const bcrypt = require("bcryptjs");

module.exports = {


// Tạo mới user 
createUser : async (user,cb) => {
    try {
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.Password, salt,async function(err, hash) {
              if (err){
                cb(err,null)
              } 
                user.Password = hash;
                Users.create(user,cb);
            });
          });    
       } catch(e) {
      throw e
    }
  },

// kiểm tra password
comparePassword : async (myPassword,hash,cb) => {
    try {         
      bcrypt.compare(myPassword,hash,(err,isMath) => {
        if(err) throw err
        cb(null, isMath)
      })
    } catch(e) {
      throw e
    }
  }

// ----------------------------------------------
}

