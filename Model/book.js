const mongosse = require("mongoose");
const Schema = mongosse.Schema;

const bookSchema = new Schema({
    Name: {type: String, required: true},
    Number: {type: Number},
    CreateAt: {type: Date, default: Date.now()},
    UpdateAt: {type: Date, default: Date.now()},
})
bookSchema.index({'$**': 'text'});
module.exports = mongosse.model("Books",bookSchema);