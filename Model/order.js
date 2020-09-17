const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');
const { schema } = require('./category');
  var Schema = mongoose.Schema;


  var OrderSchema = new Schema({
    UserId: {type: Schema.Types.ObjectId, required:true},
    Products: {type: Object, required: true},
    Amount: {type: Number},
    Price: {type: Number},
    Name: {type: String, required:true},
    Address: {type: String, required:true},
    Payment: {type: String},
    Status: {type: Number, default: 0},
    IntoMoney: {type: Number},
    IdCart: {type: Schema.Types.ObjectId, required:true}
  });

  module.exports = mongoose.model("Order", OrderSchema);