const mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var unitSchema = new Schema({ 

     Name: {type: String, required: true},
     IdCategory:   {type: mongoose.Types.ObjectId, required: true},
     Description: {type: String, required: true}
  });
  module.exports = mongoose.model("unit",unitSchema)