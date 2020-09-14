const mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var brandOriginSchema = new Schema({ 

     country: {type: String, required: true}
  });
  module.exports = mongoose.model("brandOrigin",brandOriginSchema)