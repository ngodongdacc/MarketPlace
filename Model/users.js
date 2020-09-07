const mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var UserSchema = new Schema({
    Username:  {type: String , required: true}, 
    LastName: {type: String},
    FirstName:   {type: String },
    Email:   {type: String , required: true},
    Password: {type: String , required: true},
    Phone: {type: String , required: true},
    Rule: [Number],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
  });

module.exports = mongoose.model("Users",UserSchema)