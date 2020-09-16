const Cart = require("../Model/cart");
const Product = require("../Model/product");
const async = require("async");
const CartService = require("../Services/cartService");
const UserService = require("../Services/usersService");

module.exports = {
    postCart: async (req, res, next) => {
        const { ProductId, Quantity, UserId, Title, Des,
        } = req.body;
        try {
            Product.findOne({ _id: ProductId }, async (err, resFindProduct) => {
                if (err) return res.status(400).json({ message: "Sản phẩm không còn tồn tại", errors: err, status: false });
                if (resFindProduct) {
                    resFindProduct.Quantity = Quantity;
                    const Total = Quantity * resFindProduct.Price;
                    Cart.findOne({ UserId: UserId }, async (err, resFindUser) => {
                        if (err) return res.status(400).json({ message: "Không tìm thấy user", errors: err, status: false });
                        if (resFindUser) {
                            const itemIndex = await resFindUser.ListProduct.findIndex(p => p._id == ProductId);
                            if (itemIndex > -1) {
                                //product exists in the cart, update the quantity
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

                                }, function (err, resData) {
                                    if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                                    res.json({
                                        message: "Cập nhật mới sản phẩm vào giỏ hàng thành công",
                                        status: true
                                    })
                                });
                            } else {
                                let totals = await resFindUser.ListProduct.reduce((acc, next) =>
                                    acc +  next.Quantity
                                    , 0);
                                let prices = await resFindUser.ListProduct.reduce((acc, next) =>
                                    acc + (next.Price * next.Quantity)
                                    , 0);
                                    resFindUser.SubTotal = await totals;
                                    resFindUser.SubPrice = await prices;
                                    console.log(resFindUser.SubTotal)
                                    console.log(resFindUser.SubPrice)
                                //product does not exists in cart, add new item
                                resFindUser.ListProduct.push(
                                    resFindProduct
                                );
                               
                                resFindUser.SubTotal = resFindUser.ListProduct.map(ListProduct => ListProduct.Total).reduce((acc, next) => acc + next);
                                Cart.findByIdAndUpdate(resFindUser._id, resFindUser, function (err, resData) {
                                    if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                                    res.json({
                                        message: "Cập nhật mới sản phẩm vào giỏ hàng thành công",
                                        status: true
                                    })
                                });
                            }
                        } else {
                            //no cart for user, create new cart

                            let totals = await resFindUser.ListProduct.reduce((acc, next) =>
                                acc + next.Quantity
                                , 0);
                            let prices = await resFindUser.ListProduct.reduce((acc, next) =>
                                acc + (next.Price * next.Quantity)
                                , 0);
                            resFindUser.SubTotal = await totals;
                            resFindUser.SubPrice = await prices;


                            const ListProduct = [];
                            ListProduct.push(
                                resFindProduct
                            );
                            Cart.create({
                                UserId,
                                ListProduct,
                                Des,
                                Title,
                                SubTotal: resFindUser.SubTotal,
                                SubPrice: resFindUser.SubPrice
                            }, function (err, resBRC) {
                                if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });

                                res.json({
                                    message: "Thêm mới sản phẩm thành công",
                                    data: resBRC,
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
        // console.log(UserId)
        Cart.findOne({ UserId: UserId }, async (err, resFindUser) => {
            if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
            if (!resFindUser) return res.status(400).json({ message: "Không tìm thấy User", data: null, status: false });
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
    delete_Quantity_OfCart: async (req, res) => {
        let { id, UserId, Quantity } = req.body
        Cart.findOne({ UserId: UserId }, async (err, resUserCart) => {
            if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
            if (!resUserCart) return res.status(400).json({ message: "Không tìm thấy User", data: null, status: false });
            if (resUserCart) {
                let itemIndex = await resUserCart.ListProduct.findIndex(p => p._id == id);
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
                            if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                            res.json({
                                message: "Xóa sản phẩm thành công",
                                data: resRemove,
                                status: true
                            })
                        })
                    } else {
                        res.json({
                            message: "Không thể xóa giá trị này",
                            data: null,
                            status: false
                        })
                    }

                } else {
                    res.json({
                        message: "Có lỗi xảy ra",
                        // data: resRemove,
                        status: false
                    })
                }
            }
        })
    },
    delete_All_ForUser: async (req, res) => {
        const id = req.params.id
        Cart.findOne({ _id: id }, async (err, resFindUser) => {
            if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
            if (!resFindUser) return res.status(400).json({ message: "Không tìm thấy User", data: null, status: false });
            if (resFindUser) {
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
        const id = req.params.id
        Cart.findOne({ UserId: id }, function (err, resData) {
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