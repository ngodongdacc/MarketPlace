const mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var CategorySchema = new Schema({
      Icon: {type: String},
      Title: {type: String ,required: true},
      Description: {type: String},
  });

  module.exports = mongoose.model("Categorys", CategorySchema)
