const mongoose = require('mongoose');
  var Schema = mongoose.Schema;


  var CategorySchema = new Schema({
      icon: {type: String},
      title: {type: String ,required: true},
      description: {type: String},
  });

  module.exports = mongoose.model("Categorys", CategorySchema)
