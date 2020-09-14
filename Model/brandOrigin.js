const mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var brandOriginSchema = new Schema({ 
     nameTrademark:  {type: String , required: true},
     country: {type: String, required: true}
  });
  module.exports = mongoose.model("brandOrigin",brandOriginSchema)