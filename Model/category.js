  
const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CategorySchema = new Schema({
  icon: {
    type: String,
    require: true
  },
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