const mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var originSchema = new Schema({ 

     countrys: {type: String, required: true}
  });
  module.exports = mongoose.model("origin",originSchema)