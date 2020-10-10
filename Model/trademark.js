const mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var trademarkSchema = new Schema({ 
     Name:  {type: String , required: true},
     Country: {type: String, required: true},
     IdCategory:   {type: mongoose.Types.ObjectId, required: true},
     IdCategorySub:   {type: mongoose.Types.ObjectId, required: true},
     Description: {type: String}
  });
  module.exports = mongoose.model("trademark",trademarkSchema)