const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShopSchema = new Schema({
    StoreOwnername: { type: String, required: true }, // Tên chủ cử hàng
    Phone: { type: String, required: true },  // Số điện thoại

    EmailOwner: { type: String, required: true }, // Email Shop
    PasswordShop: { type: String, required: true },
    ShopName: { type: String , required: true}, // Tên cửa hàng
    BusinessLicense: { type: Boolean, required: true, default: true }, // Giấy phép kinh doanh cửa hàng
    BusinessRegisCode: { type: Number }, //Mã số kinh doanh
    Country: { type: String }, //Thành phố đăng ký kinh doanh
    CommodityIndustry: { type: String}, // Nghành hàng hóa đăng ký kinh doanh,
    RoleShop: {
        type: String,
        default: 'shop',
        enum: ["shop", "supervisor", "admin"]
       }, // Phân quyền
}, {
    timestamps: true
});
ShopSchema.index({'$**': 'text'});
module.exports = mongoose.model("Shops", ShopSchema)