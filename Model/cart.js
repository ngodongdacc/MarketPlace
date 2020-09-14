const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
    productId: {  type:mongoose.SchemaTypes.ObjectId, required: true },
    userId: {  type:mongoose.SchemaTypes.ObjectId},
    cookieId: { type: String, default:"" },
    status: { type: Boolean , default: true},
    quantity: { type: Number, default: 1 },
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
    des: { type: String, default:"" },
    title: { type: String},
});
module.exports = mongoose.model("Carts", CartSchema)