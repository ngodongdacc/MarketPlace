const Cart = require("../Model/cart");
const Product = require("../Model/product");
const async = require("async");
const CartService = require("../Services/cartService");
const mongoose = require("mongoose");
const UserService = require("../Services/usersService");

module.exports = {
    postCart: async (req, res, next) => {
        const { ProductId, Quantity, UserId, Title, Des,
        } = req.body;
        try {
            Product.findOne({ _id: ProductId }, async (err, resFindProduct) => {
                if (err) return res.status(400).json({ message: "Sản phẩm không còn tồn tại", errors: err, status: false });
                if (resFindProduct) {

                    const Total = Quantity * resFindProduct.Price;
                    Cart.findOne({ UserId: UserId }, async (err, resFindUser) => {

                        if (err) return res.status(400).json({ message: "Không tìm thấy user", errors: err, status: false });
                        if (resFindUser) {

                           
                            const itemIndex = await resFindUser.ListProduct.findIndex(p => p.ProductId == ProductId);
                            console.log(itemIndex)

                            if (itemIndex > -1) {

                                //product exists in the cart, update the quantity
                                resFindUser.ListProduct[itemIndex].Quantity += Quantity;
                                // resFindUser.ListProduct[itemIndex].Total = (Quantity + resFindUser.ListProduct[itemIndex].quantity) * resFindProduct.Price;
                                // console.log(resFindUser)
                         
                              let totals =await resFindUser.ListProduct.reduce((acc, next) => 
 
                                    acc + next.Quantity
                                    
                                ,0);
                                let prices =await resFindUser.ListProduct.reduce((acc, next) => 
 
                                acc + (next.Price*next.Quantity)
                                
                            ,0);
                                resFindUser.SubTotal=await totals;
                                resFindUser.SubPrice=await prices;
                                console.log("SubPrice: ", resFindUser.SubPrice)
                                // console.log(resFindUser)
                                Cart.findByIdAndUpdate(resFindUser._id,await resFindUser, function (err, resData) {
                                    if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                                    res.json({
                                        message: "Cập nhật mới sản phẩm vào giỏ hàng thành công",
                                        data: resData,
                                        status: true
                                    })

                                });
                            } else {
                                resFindProduct.Quantity = Quantity;
                                resFindProduct.Total = Total;
                                //product does not exists in cart, add new item
                                resFindUser.ListProduct.push(
                                    resFindProduct
                                );
                                resFindUser.SubTotal = resFindUser.ListProduct.map(ListProduct => ListProduct.Total).reduce((acc, next) => acc + next);
                                Cart.findByIdAndUpdate(resFindUser._id, resFindUser, function (err, resData) {
                                    if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                                    res.json({
                                        message: "Cập nhật mới sản phẩm vào giỏ hàng thành công",
                                        data: resData,
                                        status: true
                                    })

                                });
                            }


                        } else {
                            //no cart for user, create new cart
                            const SubTotal = Total;
                            Cart.create({
                                UserId,
                                ListProduct: [{
                                    ProductId, Quantity,
                                    Price: resFindProduct.Price, Total,
                                    IdUser: resFindProduct.IdUser,
                                    IdShop: resFindProduct.IdShop,
                                    IdCategory: resFindProduct.IdCategory,
                                    IdCategorySub: resFindProduct.IdCategorySub,
                                    Name: resFindProduct.Name,
                                    Image: resFindProduct.Image,
                                    OutstandingFeatures: resFindProduct.OutstandingFeatures,//Đặc điểm nổi bật (ít 3 đặc điểm)
                                    DetailedAttributes: resFindProduct.DetailedAttributes, // Chi tiết thuộc tính
                                    SearchAttributes: resFindProduct.SearchAttributes, // thuộc tính tìm kiếm
                                    PointEvaluation: resFindProduct.PointEvaluation, // điểm đánh giá
                                    NumberEvaluation: resFindProduct.NumberEvaluation, // Số lượng đánh giá
                                    DetailedDescription: resFindProduct.DetailedDescription, // Mô tả chi tiết sản phẩm
                                    PackingLength: resFindProduct.PackingLength, // chiều dài đóng gói
                                    PackingWidth: resFindProduct.PackingWidth, // chiều dài đóng gọi
                                    Weight: resFindProduct.Weight, // trọng lượng
                                    CategoryGoods: resFindProduct.CategoryGoods, // danh mục hàng hóa nguy hiểm
                                    IMEI: resFindProduct.IMEI, // quản lý bằng Imaei
                                    Serial: resFindProduct.Serial, // Quản lý bằng serial
                                    Model: resFindProduct.Model, // Dòng sản phẩm
                                    Unit: resFindProduct.Unit, // Đơn vị tính
                                    Date: resFindProduct.Date, // ngày tạo 
                                    DateUpdate: resFindProduct.DateUpdate, // ngày cập nhật
                                    DeliveryAddress: resFindProduct.DeliveryAddress, // địa chỉ giao hàng
                                    Material: resFindProduct.Material, // Chất liệu
                                    Size: resFindProduct.Size, // Kích cỡ
                                    Color: resFindProduct.Color, // Màu họa tiết
                                    StorageInstructions: resFindProduct.StorageInstructions, // Hướng dẫn bảo quản
                                    LaundryInstructions: resFindProduct.LaundryInstructions, // Hướng dẫn bảo quản/giặt ủi
                                    SampleSize: resFindProduct.SampleSize, // kích cỡ mẫu
                                    ModelNumber: resFindProduct.ModelNumber, // Số đo người mẫu
                                    TypeSell: resFindProduct.TypeSell, // Dạng bán (lẻ combo bộ)
                                    Warranty: resFindProduct.Warranty, // Bảo hành
                                    PermanentWarranty: resFindProduct.PermanentWarranty, // bảo hành vĩnh viển
                                    WarrantyForm: resFindProduct.WarrantyForm, // Hình thức bảo hành ([hóa đơn, phiếu bảo hành, team bảo hành, điện tử])
                                    WarrantySevice: resFindProduct.WarrantySevice, // Dịch vụ bảo hành ([bảo hành chính hãng, bảo hành thông qua sàn điện tử])
                                    WarrantyTime: resFindProduct.WarrantyTime, // Thời gian bảo hành
                                    WarrantyUnit: resFindProduct.WarrantyUnit, // Đơn vị bảo hành ([tháng, năm])
                                    ListedPrice: resFindProduct.ListedPrice, // Giá niêm yết
                                    Price: resFindProduct.Price, // Giá bán
                                    CodeProduct: resFindProduct.CodeProduct, // Mã sản phẩm
                                    OperationModel: resFindProduct.OperationModel, // Mô hình vận hành (kho hàng tiki)
                                    ImageList: resFindProduct.ImageList, // Danh sách hình ảnh
                                    TradeDocument: resFindProduct.TradeDocument, // Tài liệu thương hiệu
                                    Status: resFindProduct.Status, // trạng thái [chờ duyệt, đã duyệt]
                                    Customs: resFindProduct.Customs, // mở rộng (size, màu),
                                    Number: resFindProduct.Number, // số lượng còn 
                                    NumberSell: resFindProduct.NumberSell, // số lượng bán được
                                    View: resFindProduct.View, // số lượng lượt xem
                                    ExpirationDateSale: resFindProduct.ExpirationDateSale, // ngày hết hạn sale
                                    StatusSale: resFindProduct.StatusSale, // ngày hết hạn sale
                                    Sale: resFindProduct.Sale, // giảm giá (%)
                                }],
                                Des,
                                Title,
                                SubTotal
                            }, function (err, resBRC) {
                                if (resBRC) {
                                    const product = {};
                                    product.Number = resFindProduct.Number - Quantity;
                                    Product.findByIdAndUpdate(resFindProduct._id, { $set: product }, {}, (err, resUpdate) => {
                                        if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                                        if (resUpdate) {
                                            res.json({
                                                message: "Cập nhật sản phẩm thành công",
                                                data: resUpdate,
                                                status: true
                                            })
                                        }
                                    })
                                }

                                if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                                res.json({
                                    message: "Tạo Thêm mới sản phẩm vào giỏ hàng thành công ",
                                    status: true
                                })
                            });
                        }
                    })
                }
            });
            //cart exists for user
        } catch (e) {
            res.send({
                message: e.message,
                errors: e.errors,
                code: 0
            }).status(500) && next(e)
        }
    },
    deleteCart: async (req, res) => {
        const { ProductId, UserId } = req.body
        console.log(UserId)
        Cart.findOne({ UserId: UserId }, async (err, resFindUser) => {
            if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
            if (!resFindUser) return res.status(400).json({ message: "Không tìm thấy User", data: null, status: false });
            if (resFindUser) {
                resFindUser.ListProduct.findIndex(p => p._id == ProductId) !== -1 && resFindUser.ListProduct.splice(resFindUser.ListProduct.findIndex(p => p.ProductId == ProductId), 1)

                Cart.findByIdAndUpdate(resFindUser._id, resFindUser, (err, resRemove) => {
                    if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                    res.json({
                        message: "Xóa sản phẩm thành công",
                        data: resRemove,
                        status: true
                    })
                })
            }
        })
    },
    delete_All_ForUser: async (req, res) => {
        const id = req.params.id
        console.log(id)
        Cart.findOne({ _id: id }, async (err, resFindUser) => {
            console.log(resFindUser)
            if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
            if (!resFindUser) return res.status(400).json({ message: "Không tìm thấy User", data: null, status: false });
            if (resFindUser) {
                // resFindUser.ListProduct = resFindUser.ListProduct.remove(resFindUser.ListProduct)
                // resFindUser.ListProduct.findIndex(p => p.ProductId == ProductId) !== -1 && resFindUser.ListProduct.splice(resFindUser.ListProduct.findIndex(p => p.ProductId == ProductId), 1)
                Cart.deleteOne({ _id: resFindUser._id }, (err, resRemove) => {
                    if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                    res.json({
                        message: "Xóa danh sách sản phẩm thành công",
                        data: resRemove,
                        status: true
                    })
                })
            }
        })
    },
    getCart: async (req, res) => {
        var getCart = new Cart(req.params);
        CartService.getCart(getCart, function (err, resData) {
            if (err) {
                return res.send({
                    message: "get Cart failse",
                    errors: err,
                    status: false,
                }).status(400)
            }
            res.send({
                message: "get succsess",
                data: resData,
                status: true
            })
        })
    },
    showCartForUser: async (req, res) => {
<<<<<<< HEAD
        const {UserId } = req.query
        console.log("UserId:: ",new mongoose.mongo.ObjectId(UserId));
        Cart.findOne({ UserId: new mongoose.mongo.ObjectId(UserId)}, function (err, resData) {
=======
        const id = req.params.id
        Cart.findOne({ UserId: id }, function (err, resData) {
>>>>>>> tech24_Kokoro
            if (err) {
                return res.send({
                    message: "get Cart failse",
                    errors: err,
                    status: false,
                }).status(400)
            }
            res.send({
                message: "get succsess",
                data: resData,
                status: true
            })
        })
    }
}