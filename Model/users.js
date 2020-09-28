const mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var UserSchema = new Schema({
    LastName: {type: String, default:""}, // Họ
    FirstName:   {type: String , default:""}, // Tên
    FullName:   {type: String , default:""}, // Họ và Tên
    Address:   {type: Array , default:""}, // địa chỉ
    Gender:   {type: Number }, // giới tính 
    Birthday:   {type: Date }, // Ngày sinh 
    Email:   {type: String , required: true,unique: true}, // Email
    Password: {type: String , required: true, unique: true}, // Mật khẩu
    Phone: {type: String , default:""}, // Điện thoại
    Sale: {type: Boolean, default: false }, // nhận chương trình khuyến mãi
    Role: {
      type: String,
      default: 'user',
      enum: ["user", "supervisor", "admin"]
     }, // Phân quyền
    Date: { type: Date, default: Date.now }, // Ngày tạo
    DateUpdate: { type: Date, default: Date.now }, // Ngày update
    hidden: Boolean,
    Avatar: { type: String, default: "", }, // ảnh đại diện
    Facebook: {
      uid: String,
      token: String,
      email: { type: String, trim: true },
    },
    Google: { uid: String, token: String, email: { type: String, trim: true } },
    // Verify: { type: Boolean, default: false },
  });
  UserSchema.index({'$**': 'text'});
  
module.exports = mongoose.model("Users",UserSchema)