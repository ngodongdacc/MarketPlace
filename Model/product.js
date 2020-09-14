const mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var productcSchema = new Schema({
     products: {type: String , required: true}, 
     nameProducts:  {type: String , required: true}, 
     linkIcons: { type: String , required: true} 
  });
  module.exports = mongoose.model("product",productcSchema)
