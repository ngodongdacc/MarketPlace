const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
    Content: { type: String, required: true }, // Nội dung của thông báo
    NewDateAt: { type: Date, default: Date.now }, // Ngày tạo
    URL:  { type: String }, // Đường dẫn của nội dung thông báo
    IdUser: {
        type: mongoose.Types.ObjectId, required: true // Id tài khoản thông báo
    },
    Status: {
        type: Boolean // Trạng thái của thông báo( đã xem, chưa xem)
    }
});
module.exports = mongoose.model("Notifications", NotificationSchema); 