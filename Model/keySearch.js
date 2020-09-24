
const mongoose = require('mongoose');
  const Schema = mongoose.Schema;
  
  const KeySearchSchema = new Schema({
    ListIdUser: [{
        Counts: { type: Number, default: 1},
        IdUser: { type: mongoose.Types.ObjectId}
    }],
    Key: {type: String, required:true},
    CountSearch: {type: Number, default: 1},
    CreateAt: {type: Date, default: Date.now()},
    UpdateAt: {type: Date, default: Date.now()},
  });

  module.exports = mongoose.model("KeySearchs", KeySearchSchema);