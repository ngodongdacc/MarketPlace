
var Users = require("../Model/users");
const bcrypt = require("bcryptjs");

module.exports = {
// Tìm kiếm user 
findOneUser : async (username,cb) => {
  try {         
    Users.findOne({Username: username},cb);
  } catch(e) {
    throw e
  }
},

// Tạo mới user 
<<<<<<< HEAD
createUser : async (user,cb) => {
=======
const createUser = async (user,cb) => {
>>>>>>> c8c7de46a2caca481d2d87d9a7367a22432c8de8
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
// Tìm kiếm user theo id 
getUserById : async (id,cb) => {
    try {         
       Users.findById(id,cb);
    } catch(e) {
      throw e
    }
  },

  // Cập nhật thông tin user
 updateUser : async (id,user,cb) => {
  try {         
     Users.updateOne({_id: id},user,cb);
  } catch(e) {
    throw e
  }
},


  // Tìm kiếm user 
findOneUserByID : async (id,cb) => {
    try {         
      Users.findById(id,cb);
    } catch(e) {
      throw e
    }
  },

removeUserById : async (id,cb) => {
  try {         
    Users.findByIdAndRemove(id,cb);
  } catch(e) {
    throw e
  }
},
// Tìm kiếm email 
findEmail: async (Email,cb) => {
    try {         
      Users.findOne({Email: Email},cb);
    } catch(e) {
      throw e
    }
  },
// Tìm kiếm Phone 
findPhone: async (Phone,cb) => {
    try {         
      Users.findOne({Phone: Phone},cb);
    } catch(e) {
      throw e
    }
  },

searchUsers: async (search,cb) => {  
  var objSearch = {}
  if(search.text)
    objSearch = {$text: {$search: search.text}}    
  Users.find(objSearch)  
       .skip(search.skip)
       .limit(search.limit)
       .sort({Date: 'desc'})
       .exec(cb)
},

countUsers: async (cb) => {  
  Users.count({},cb);
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