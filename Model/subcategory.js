const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubCategorySchema = new Schema({
    idCategory: {
        type:mongoose.SchemaTypes.ObjectId
    },
    title: {
        type: String ,
          required: true
      },
    name: {
        type: String ,
         required: true
      },
});

module.exports = mongoose.model("SubCategoris", SubCategorySchema)