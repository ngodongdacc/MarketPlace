const mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var trademarkSchema = new Schema({ 
     NameTrademark:  {type: String , required: true}
  });
  module.exports = mongoose.model("trademark",trademarkSchema)