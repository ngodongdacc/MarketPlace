const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');
const { schema } = require('./category');
  var Schema = mongoose.Schema;


  var OrderSchema = new Schema({
    UserId: {type: mongoose.Types.ObjectId, required:true},
    Products: {type: Array, required:true},
    Price: {type: Number},
    Name: {type: String, required:true},
    Address: {type: String},
    Phone: {type: Number},
    Payment: {type: String},
    Status: {type: Number, default: 0},
    IntoMoney: {type: Number},
    IdCart: {type: mongoose.Types.ObjectId, required:true},
    Date: { type: Date, default: Date.now }, // ngày tạo 
    DateUpdate: { type: Date, default: Date.now }, // ngày cập nhật
  });

  module.exports = mongoose.model("Order", OrderSchema);