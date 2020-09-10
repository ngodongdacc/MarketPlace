const mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var DanhMucSchema = new Schema({
    title:  {type: String , required: true}, 
    des:  {type: String }, 
  });

module.exports = mongoose.model("DanhMucs",DanhMucSchema)