const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    Content: { type: String, required: true },
    Reply: {
        type: Array, default: [] // Danh dách comment trả lời
    },
    NewDateAt: { type: Date, default: Date.now }, // Ngày tạo
    UpDateAt: { type: Date, default: Date.now }, // Ngày cập nhật
    IdUser: {
        type: mongoose.Types.ObjectId, required: true // Id tài khoản comment
    },
    IdProduct: {
        type: mongoose.Types.ObjectId, required: true // Id sản phẩm comment
    },
});
module.exports = mongoose.model("Comments", CommentSchema); 