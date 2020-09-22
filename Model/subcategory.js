const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubCategorySchema = new Schema({
    IdCategory: {
        type:mongoose.SchemaTypes.ObjectId
    },
    Title: {
        type: String ,
          required: true
      },
    Name: {
        type: String ,
         required: true
      },
});

module.exports = mongoose.model("SubCategorys", SubCategorySchema)