const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new Schema({
    Title: {type: String},
    Des: {type: String}
})

module.exports = mongoose.model("Tags", TagSchema)
