const Cart = require("../Model/cart");
const CartService = require("../Services/cartService");
const UserService = require("../Services/usersService");
module.exports = {
    postCart: async (req, res, next) => {
        const { productId, quantity, userId, price, title, des,
            IdShop,
            IdCategory,
            IdCategorySub,
            Name,
            Sale,
            Image,
            Color, 
            NumberSell, 
            ListedPrice,
        
        } = req.body;
        const total = quantity * price;
        try {
            Cart.findOne({ userId: userId }, (err, resFindUser) => {
                if (err) return res.status(400).json({ message: "Không tìm thấy user", errors: err, status: false });
                if (resFindUser) {
                    const itemIndex = resFindUser.listProduct.findIndex(p => p.productId == productId);
                    if (itemIndex > -1) {
                        //product exists in the cart, update the quantity
                        resFindUser.listProduct[itemIndex].quantity += quantity;
                        resFindUser.listProduct[itemIndex].total = (quantity + resFindUser.listProduct[itemIndex].quantity) * price;
                    } else {
                        //product does not exists in cart, add new item
                        resFindUser.listProduct.push({ productId, quantity, price, total,
                            IdShop,
                            IdCategory,
                            IdCategorySub,
                            Name,
                            Sale,
                            Image,
                            Color, 
                            NumberSell, 
                            ListedPrice,
                        });
                    }
                    resFindUser.subTotal = resFindUser.listProduct.map(listProduct => listProduct.total).reduce((acc, next) => acc + next);
                    Cart.findByIdAndUpdate(resFindUser._id, resFindUser, function (err, resData) {
                        if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                        res.json({
                            message: "Cập nhật mới sản phẩm vào giỏ hàng thành công",
                            status: true
                        })
                    });
                } else {
                    //no cart for user, create new cart
                    const subTotal = total;
                    Cart.create({
                        userId,
                        listProduct: [{ productId, quantity, price, total,
                            IdShop,
                            IdCategory,
                            IdCategorySub,
                            Name,
                            Sale,
                            Image,
                            Color, 
                            NumberSell, 
                            ListedPrice,
                        }],
                        des,
                        title,
                        subTotal
                    }, function (err, resBRC) {
                        if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                        res.json({
                            message: "Tạo Thêm mới sản phẩm vào giỏ hàng thành công ",
                            status: true
                        })
                    });
                }
            })
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
        const { productId, userId } = req.body
        console.log(userId);
        console.log(productId);
        Cart.findOne({ userId: userId }, async (err, resFindUser) => {
            if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
            if (!resFindUser) return res.status(400).json({ message: "Không tìm thấy User", data: null, status: false });
            if (resFindUser) {
                resFindUser.listProduct.findIndex(p => p.productId == productId) !== -1 && resFindUser.listProduct.splice(resFindUser.listProduct.findIndex(p => p.productId == productId), 1)

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
    }
    // ,
    //  searchCart: async (req, res) => {
    //     var search = req.body.cartId
    //     CartService.findCart(search, function (err, resData) {
    //         if (err) {
    //             return res.send({
    //                 message: "Seach product failse",
    //                 errors: err,
    //                 status: false,
    //             }).status(400)
    //         }
    //         res.send({
    //             message: "Search succsess",
    //             data: resData,
    //             status: true
    //         })
    //     })
    // }
}