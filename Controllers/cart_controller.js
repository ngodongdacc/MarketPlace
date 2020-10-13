const Cart = require("../Model/cart");
const Product = require("../Model/product");
const async = require("async");
const CartService = require("../Services/cartService");
const mongoose = require("mongoose");
const UserService = require("../Services/usersService");
const User = require("../Model/users");
const { success, error_500, error_400 } = require("../validator/errors");
module.exports = {
    postCart: (req, res, next) => {
        // console.log("request cart:: ", req);
        const { ProductId, Quantity
        } = req.body;
        let UserId = req.user._id;
        if (!UserId)
            return error_400(res, "Vui lòng đăng nhập", "Login");
        try {
            User.findById(UserId, async (err, resUser) => {
                if (err) return error_500(res, err)
                if (!resUser) return error_400(res, "Không tìm thấy người dùng", "UserId");
                Product.findById(ProductId, async (err, resFindProduct) => {
                    if (err) return error_500(res, err)
                    if (!resFindProduct) return error_400(res, "Không tìm thấy sản phẩm", "ProductId");
                    if (resFindProduct) {
                        if (Quantity <= 0) return error_400(res, "Số lượng sản phẩm phải lớn hơn 0", "Quantity");
                        if (resFindProduct.Quantity > 0) {
                            resFindProduct.Quantity = Quantity;
                            const Total = Quantity * resFindProduct.Price;
                            Cart.findOne({ UserId: UserId }, async (err, resFindUser) => {
                                if (err) return error_500(res, err)
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
                                            if (err) return error_500(res, err)
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
                                        Cart.findByIdAndUpdate(resFindUser._id, { $set: resFindUser }, { new: true }, function (err, resData) {
                                            if (err) return error_500(res, err)
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
                                        SubTotal: SubTotal,
                                        SubPrice: SubPrice
                                    }, function (err, resBRC) {
                                        if (err) return error_500(res, err)
                                        success(res, "Thêm mới sản phẩm thành công", resBRC)
                                    });
                                }
                            })
                        } else {
                            error_400(res, "Sản phẩm này đã bán hết", "Product");
                        }
                    }
                });
            })
            //cart exists for user
        } catch (e) {
            error_500(res, e)
        }
    },
    deleteCart: async (req, res) => {
        const { ProductId } = req.body
        let UserId = req.user._id;
        if (!UserId)
            return error_400(res, "Vui lòng đăng nhập", "Login");
        User.findById(UserId, async (err, resUser) => {
            if (err) return error_500(res, err)
            if (!resUser) return error_400(res, "Không tìm thấy người dùng", "UserId");
            Cart.findOne({ UserId: UserId }, async (err, resFindUser) => {
                if (err) return error_500(res, err)
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
                    Cart.findByIdAndUpdate(resFindUser._id, { $set: resFindUser }, { new: true }, (err, resRemove) => {
                        if (err) return error_500(res, err)
                        if (resRemove)
                            success(res, "Xóa sản phẩm thành công", resRemove)
                    })
                }
            })
        })

    },
    delete_Quantity_OfCart: async (req, res) => {
        let { ProductId, Quantity } = req.body
        let UserId = req.user._id;
        if (!UserId)
            return error_400(res, "Vui lòng đăng nhập", "Login");
        User.findById(UserId, async (err, resUser) => {
            if (err) return error_500(res, err)
            if (!resUser) return error_400(res, "Không tìm thấy người dùng", "UserId");
            Cart.findOne({ UserId: UserId }, async (err, resUserCart) => {
                if (err) return error_500(res, err)
                if (!resUserCart) return error_400(res, "Không tìm thấy giỏ hàng của người dùng", "UserId");
                if (resUserCart) {
                    let itemIndex = await resUserCart.ListProduct.findIndex(p => p._id == ProductId);
                    if (itemIndex > -1) {
                        if (resUserCart.ListProduct[itemIndex].Quantity <= 0) 
                        return error_400(res, "Số lượng của sản phẩm phải lớn hơn 1", "ProductId");
                        if (Quantity <=0) return error_400(res, "Phải có ít nhất 1 sản phẩm ", "Quantity");
                        resUserCart.ListProduct[itemIndex].Quantity = Quantity;
                        let totals = await resUserCart.ListProduct.reduce((acc, next) =>
                            acc + next.Quantity
                            , 0);
                        let prices = await resUserCart.ListProduct.reduce((acc, next) =>
                            acc + (next.Price * next.Quantity)
                            , 0);
                        resUserCart.SubTotal = await totals;
                        resUserCart.SubPrice = await prices;
                        Cart.findByIdAndUpdate(resUserCart._id, { $set: resUserCart }, { new: true }, (err, resRemove) => {
                            if (err) return error_500(res, err)
                            success(res, "Đã cập nhật số lượng sản phẩm", resRemove)
                        })
                    } else {
                        error_400(res, "Sản phẩm không tồn tại trong giỏ hàng", "ProductId");
                    }
                }
            })
        })
    },
    delete_All_ForUser: async (req, res) => {
        let UserId = req.user._id;
        if (!UserId)
            return error_400(res, "Vui lòng đăng nhập", "Login");
        User.findById(UserId, async (err, resUser) => {
            if (err) return error_500(res, err)
            if (!resUser) return error_400(res, "Không tìm thấy người dùng", "UserId");
            Cart.findOne({ UserId: UserId }, async (err, resFindUser) => {
                if (err) return error_500(res, err)
                if (!resFindUser) return error_400(res, "Không tìm thấy giỏ hàng để xóa", "IdCart");
                if (resFindUser) {
                    Cart.deleteOne({ _id: resFindUser._id }, (err, resRemove) => {
                        if (err) return error_500(res, err)
                        success(res, "Xóa danh sách sản phẩm thành công", resRemove)
                    })
                }
            })
        })
    },
    getCart: async (req, res) => {
        var getCart = new Cart(req.params);
        CartService.getCart(getCart, function (err, resData) {
            if (err) return error_500(res, err)
            success(res, "Lấy danh sách sản phẩm thành công", resData)
        })
    },
    showCartForUser: async (req, res) => {
        let UserId = req.user._id;
        if (!UserId)
            return error_400(res, "Vui lòng đăng nhập", "Login");
        User.findById(UserId, async (err, resUser) => {
            if (err) return error_500(res, err)
            if (!resUser) return error_400(res, "Không tìm thấy người dùng", "UserId");
            Cart.findOne({ UserId: UserId }, function (err, resData) {
                if (err) return error_500(res, err)
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
                        if (err) return error_500(res, err)
                        success(res, "Không có sản phẩm trong cửa hàng", resBRC)
                    });
                }
            })
        })

    }
}