const mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var UserSchema = new Schema({
    Username:  {type: String , required: true, unique: true}, 
    LastName: {type: String, default:""},
    FirstName:   {type: String , default:""},
    Email:   {type: String , required: true,unique: true},
    Password: {type: String , required: true, unique: true},
    Phone: {type: String , default:""},
    Role: {
      type: String,
      default: 'basic',
      enum: ["basic", "supervisor", "admin"]
     },
    Date: { type: Date, default: Date.now },
    DateUpdate: { type: Date, default: Date.now },
    hidden: Boolean,
    Avatar: {
      type: String,
      default: "",
    },
    Facebook: {
      uid: String,
      token: String,
      email: { type: String, trim: true },
    },
    Google: { uid: String, token: String, email: { type: String, trim: true } },
    Verify: { type: Boolean, default: false },
  });
  UserSchema.index({'$**': 'text'});
  
module.exports = mongoose.model("Users",UserSchema)