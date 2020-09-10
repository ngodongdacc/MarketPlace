const mongoose = require('mongoose');
  var Schema = mongoose.Schema;


  var CategorySchema = new Schema({
      title: {
          type: String ,
            required: true
        },
      description: {
          type: String ,
           required: true
        },
  });

  module.exports = mongoose.model("Categorys", CategorySchema)