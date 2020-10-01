const Cart = require("../Model/cart");
const Product = require("../Model/product");
const async = require("async");
const CartService = require("../Services/cartService");
const mongoose = require("mongoose");
const UserService = require("../Services/usersService");
const { success, error_500, error_400 } = require("../validator/errors");
module.exports = {
    postCart: (req, res, next) => {
        // console.log("request cart:: ", req);
        const { ProductId, Quantity, UserId
        } = req.body;
        try {
            Product.findOne({ _id: ProductId }, async (err, resFindProduct) => {
                if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                if (!resFindProduct) return error_400(res, "Không tìm thấy sản phẩm", "ProductId");
                if (resFindProduct) {
                    if (resFindProduct.Quantity > 0) {
                        resFindProduct.Quantity = Quantity;
                        const Total = Quantity * resFindProduct.Price;
                        Cart.findOne({ UserId: UserId }, async (err, resFindUser) => {
                            if (err)
                                return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                            if (resFindUser) {
                                const itemIndex = await resFindUser.ListProduct.findIndex(p => p._id == ProductId);
                                if (itemIndex > -1) {
                                    resFindUser.ListProduct[itemIndex].Quantity += Quantity;
                                    let totals = await resFindUser.ListProduct.reduce((acc, next) =>
                                        acc + next.Quantity
                                        , 0);
                                    let prices = await resFindUser.ListProduct.reduce((acc, next) =>
                                        acc + (next.Price * next.Quantity)
                                        , 0);
                                    resFindUser.SubTotal = await totals;
                                    resFindUser.SubPrice = await prices;
                                    let CartUpdate = {};
                                    CartUpdate = await resFindUser;
                                    Cart.findOneAndUpdate({ _id: resFindUser._id }, {
                                        ListProduct: CartUpdate.ListProduct,
                                        SubTotal: CartUpdate.SubTotal,
                                        SubPrice: CartUpdate.SubPrice

                                    }, { new: true }, function (err, resData) {
                                        if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                                        success(res, "Cập nhật mới sản phẩm vào giỏ hàng thành công", resData)
                                    });
                                } else {
                                    resFindProduct.Quantity = Quantity;
                                    // resFindProduct.Quantity += Quantity; 
                                    resFindUser.ListProduct.push(
                                        resFindProduct
                                    );
                                    let totals = await resFindUser.ListProduct.reduce((acc, next) =>
                                        acc + next.Quantity
                                        , 0);
                                    let prices = await resFindUser.ListProduct.reduce((acc, next) =>
                                        acc + (next.Price * next.Quantity)
                                        , 0);
                                    resFindUser.SubTotal = await totals;
                                    resFindUser.SubPrice = await prices;
                                    //product does not exists in cart, add new item
                                    resFindUser.SubTotal = resFindUser.ListProduct.map(ListProduct => ListProduct.Total).reduce((acc, next) => acc + next);
                                    Cart.findByIdAndUpdate(resFindUser._id, { $set: resFindUser },{ new: true }, function (err, resData) {
                                        if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                                        success(res, "Cập nhật mới sản phẩm vào giỏ hàng thành công", resData)
                                    });
                                }
                            } else {
                                SubTotal = Quantity;
                                SubPrice = Quantity * resFindProduct.Price;
                                const ListProduct = [];
                                ListProduct.push(
                                    resFindProduct
                                );
                                Cart.create({
                                    UserId,
                                    ListProduct,
                                    Des,
                                    Title,
                                    SubTotal: SubTotal,
                                    SubPrice: SubPrice
                                }, function (err, resBRC) {
                                    if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                                    success(res, "Thêm mới sản phẩm thành công", resBRC)
                                });
                            }
                        })
                    } else {
                        return error_400(res, "Sản phẩm này đã bán hết", "Product");
                    }
                }
            });
            //cart exists for user
        } catch (e) {
            error_500(res, e)
        }
    },
    deleteCart: async (req, res) => {
        const { ProductId, UserId } = req.body
        // console.log(UserId)
        Cart.findOne({ UserId: UserId }, async (err, resFindUser) => {
            if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
            if (resFindUser) {
                resFindUser.ListProduct.findIndex(p => p._id == ProductId) !== -1 && resFindUser.ListProduct.splice(resFindUser.ListProduct.findIndex(p => p._id == ProductId), 1)
                let totals = await resFindUser.ListProduct.reduce((acc, next) =>
                    acc + next.Quantity
                    , 0);
                let prices = await resFindUser.ListProduct.reduce((acc, next) =>
                    acc + (next.Price * next.Quantity)
                    , 0);
                resFindUser.SubTotal = await totals;
                resFindUser.SubPrice = await prices;
                Cart.findByIdAndUpdate(resFindUser._id, resFindUser, (err, resRemove) => {
                    if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                    success(res, "Xóa sản phẩm thành công", resRemove)
                })
            }
        })
    },
    delete_Quantity_OfCart: async (req, res) => {
        let { ProductId, UserId, Quantity } = req.body
        Cart.findOne({ UserId: UserId }, async (err, resUserCart) => {
            if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
            if (!resUserCart)  return error_400(res, "Không tìm thấy giỏ hàng của người dùng", "UserId");
              if (resUserCart) {
                let itemIndex = await resUserCart.ListProduct.findIndex(p => p._id == ProductId);
                if (itemIndex > -1) {
                    if (resUserCart.ListProduct[itemIndex].Quantity > Quantity) {
                        resUserCart.ListProduct[itemIndex].Quantity -= Quantity;
                        let totals = await resUserCart.ListProduct.reduce((acc, next) =>
                            acc + next.Quantity
                            , 0);
                        let prices = await resUserCart.ListProduct.reduce((acc, next) =>
                            acc + (next.Price * next.Quantity)
                            , 0);
                        resUserCart.SubTotal = await totals;
                        resUserCart.SubPrice = await prices;
                        Cart.findByIdAndUpdate(resUserCart._id, resUserCart, (err, resRemove) => {
                            if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                            success(res, "Xóa sản phẩm thành công", resRemove)
                        })
                    } else {
                        error_400(res, "Số lượng của sản phẩm phải lớn hơn 1", "ProductId");
                    }

                } else {
                    error_400(res, "Sản phẩm không tồn tại trong giỏ hàng", "ProductId");
                }
            }
        })
    },
    delete_All_ForUser: async (req, res) => {
        const id = req.params.id
        Cart.findOne({ _id: id }, async (err, resFindUser) => {
            if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
            if (!resFindUser) return error_400(res, "Không tìm thấy User", "IdCart");
            if (resFindUser) {
                Cart.deleteOne({ _id: resFindUser._id }, (err, resRemove) => {
                    if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                    success(res, "Xóa danh sách sản phẩm thành công", resRemove)
                })
            }
        })
    },
    getCart: async (req, res) => {
        var getCart = new Cart(req.params);
        CartService.getCart(getCart, function (err, resData) {
            if (err) {
                return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
            }
            success(res, "Lấy danh sách sản phẩm thành công", resData)
        })
    },
    showCartForUser: async (req, res) => {
        const { UserId } = req.query
        Cart.findOne({ UserId: new mongoose.mongo.ObjectId(UserId) }, function (err, resData) {
            if (err) {
                return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
            }
            if (resData) {
                success(res, "Lấy danh sách sản phẩm thành công", resData)
            } else {
                const ListProduct = [];
                Cart.create({
                    UserId: UserId,
                    ListProduct,
                    SubTotal: 0,
                    SubPrice: 0
                }, function (err, resBRC) {
                    if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                    success(res, "Không có sản phẩm trong cửa hàng", resBRC)
                });
            }
        })
    }
}