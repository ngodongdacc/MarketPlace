const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    Star        : { type: Number, enum: [1, 2, 3, 4, 5], required: true },
    IdProduct   : { type: mongoose.Types.ObjectId, required: true },
    IdUser      : { type: mongoose.Types.ObjectId, required: true },
    NewDateAt   : { type: Date, default: Date.now() },
    UpdateAt    : { type: Date, default: Date.now() }
}) 

module.exports = mongoose.model("Rangtings",RatingSchema);