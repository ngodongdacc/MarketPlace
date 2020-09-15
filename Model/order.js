const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');
const { schema } = require('./category');
  var Schema = mongoose.Schema;


  var OrderSchema = new Schema({
    UserId: {type: Schema.Types.ObjectId, ref: 'Users'},
    Products: {type: Object, required:true},
    Amount: {type: Number, required:true},
    Price: {type: Number, required: true},
    Name: {type: String, required:true},
    Address: {type: String, required:true},
    Payment: {type: String, required:true},
    Status: {type: Number, default: 0},
    IntoMoney: {type: Number},
    IdCart: {type: Schema.Types.ObjectId}
  });

  module.exports = mongoose.model("Ordder", schema);