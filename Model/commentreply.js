const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentReplySchema = new Schema({
    Content: { type: String, required: true },
    NewDateAt: { type: Date, default: Date.now }, // Ngày tạo
    UpDateAt: { type: Date, default: Date.now }, // Ngày cập nhật
    IdParent: { // Id comment cha
        type: mongoose.Types.ObjectId, required: true // Id tài khoản comment
    },
    IdUser: {
        type: mongoose.Types.ObjectId, required: true // Id tài khoản comment
    },
    IdProduct: {
        type: mongoose.Types.ObjectId, required: true // Id sản phẩm comment
    },
});
module.exports = mongoose.model("CommentReplys", CommentReplySchema); 