const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShopSchema = new Schema({
    storeOwnername: { type: String, required: true },
    phone: { type: String, required: true },
    emailOwner: { type: String, required: true },
    passwordShop: { type: String, required: true },
    shopName: { type: String , required: true},
    businessLicense: { type: Boolean, default: true },
    businessRegisCode: { type: Number, required: true },
    country: { type: String },
    chooseCatalog: { type: String ,required:true},
    title: { type: String},
    des: { type: String },
});
module.exports = mongoose.model("Shops", ShopSchema)