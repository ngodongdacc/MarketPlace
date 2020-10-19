const mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var OrderSchema = new Schema({
    UserId: {type: mongoose.Types.ObjectId, required:true},
    Products: {type: Array, required:true},
    Name: {type: String, required:true},
    Email: {type: String},
    Address: {type: String},
    Phone: {type: Number},
    Payment: {type: String},
    CodeOrder: {type: String},
    Status: {type: Number, default: 0},
    IntoMoney: {type: Number},
    GrossProduct: {type: Number},
    Reason: {type: String},
    IdCart: {type: mongoose.Types.ObjectId, required:true},
    CreateAt: { type: Date, default: Date.now }, // ngày tạo 
    UpdateAt: { type: Date, default: Date.now }, // ngày cập nhật
  });
  OrderSchema.index({'$**': 'text'});
  module.exports = mongoose.model("Order", OrderSchema);

 