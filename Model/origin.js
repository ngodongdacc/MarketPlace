const mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var originSchema = new Schema({ 

     Country: {type: String, required: true},
     Description: {type: String}

  });
  module.exports = mongoose.model("origin",originSchema)