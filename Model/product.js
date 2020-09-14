const mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var ProductSchema = new Schema({
    IdUser:  { type: mongoose.Types.ObjectId , required: true}, 
    IdShop: {type: mongoose.Types.ObjectId, required: true},
    IdCategory:   {type: mongoose.Types.ObjectId, required: true},
    IdCategorySub:   {type: mongoose.Types.ObjectId, required: true},
    Name:   {type: String, required: true },
    Image: {type: Array},
    OutstandingFeatures: {type: String },//Đặc điểm nổi bật (ít 3 đặc điểm)
    DetailedAttributes: {type: String}, // Chi tiết thuộc tính
    SearchAttributes: {type: String}, // thuộc tính tìm kiếm
    PointEvaluation: {type: Number}, // điểm đánh giá
    NumberEvaluation: {type: Number}, // Số lượng đánh giá
    DetailedDescription: {type: String}, // Mô tả chi tiết sản phẩm
    PackingLength: {type: Number}, // chiều dài đóng gói
    PackingWidth: {type: Number}, // chiều dài đóng gọi
    Weight: {type: Number}, // trọng lượng
    CategoryGoods: {type: String}, // danh mục hàng hóa nguy hiểm
    IMEI: {type: Boolean, default: false}, // quản lý bằng Imaei
    Serial: {type: Boolean, default: false}, // Quản lý bằng serial
    Model: {type: String, default: false}, // Dòng sản phẩm
    Unit: {type: Object}, // Đơn vị tính
    Date: { type: Date, default: Date.now }, // ngày tạo 
    DateUpdate: { type: Date, default: Date.now }, // ngày cập nhật
    DeliveryAddress: { type: Object }, // địa chỉ giao hàng
    Material: { type: String }, // Chất liệu
    Size: { type: String }, // Kích cỡ
    Color: { type: String }, // Màu họa tiết
    StorageInstructions: { type: String }, // Hướng dẫn bảo quản
    LaundryInstructions: { type: String }, // Hướng dẫn bảo quản/giặt ủi
    SampleSize: { type: String }, // kích cỡ mẫu
    ModelNumber: { type: String }, // Số đo người mẫu
    TypeSell: { type: String }, // Dạng bán (lẻ combo bộ)
    Warranty: { type: Boolean, default: false }, // Bảo hành
    PermanentWarranty: { type: Boolean, default: false }, // bảo hành vĩnh viển
    WarrantyForm: { type: String}, // Hình thức bảo hành ([hóa đơn, phiếu bảo hành, team bảo hành, điện tử])
    WarrantySevice: { type: String}, // Dịch vụ bảo hành ([bảo hành chính hãng, bảo hành thông qua sàn điện tử])
    WarrantyTime: { type: Number}, // Thời gian bảo hành
    WarrantyUnit: { type: String}, // Đơn vị bảo hành ([tháng, năm])
    ListedPrice: { type: Number}, // Giá niêm yết
    Price: { type: Number}, // Giá bán
    CodeProduct: { type: String}, // Mã sản phẩm
    OperationModel: { type: String}, // Mô hình vận hành (kho hàng tiki)
    ImageList: { type: Array}, // Danh sách hình ảnh
    TradeDocument: { type: Array}, // Tài liệu thương hiệu
    Status: { type: Array}, // trạng thái [chờ duyệt, đã duyệt]
    Customs: {type: Array}, // mở rộng (size, màu),
    Number: {type: Number}, // số lượng
    NumberSell: {type: Number}, // số lượng bán được
    View: {type: Number}, // số lượng lượt xem
    ExpirationDateSale: {type: Date}, // ngày hết hạn sale
    StatusSale: {type: Boolean, default: false}, // ngày hết hạn sale
    Sale: {type: Number, default: 0, max:100, min:0}, // giảm giá (%)
  });
  
  ProductSchema.index({'$**': 'text'},{ unique : true });

module.exports = mongoose.model("Products",ProductSchema)