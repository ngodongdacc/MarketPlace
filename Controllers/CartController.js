
const Cart = require("../Model/cart");
const CartService = require("../Services/cartService");

const postCart = (req, res) => {
    // return res.send("ok")
    var newCart = new Cart(req.body);
    CartService.createCart(newCart, function (err, resData) {


        if (err) {
            return res.send({
                message: "create product in cart failed",
                data: null,
                errors: err.errors,
                code: 0,
                status: false,
            }).status(400)
        }

        res.send({
            message: "thêm một sản phẩm vào giỏ hàng thành công",
            data: resData
        })
    })
}
const updateCart = async (req, res) => {
    var updateCart = new Cart(req.body);
    CartService.updateCart(updateCart, function (err, resData) {
        if (err) {
            return res.send({
                message: "Update error",
                errors: err,
                status: false,
            }).status(400)
        }
        res.send({
            message: "update success!",
            data: resData,
            status: true
        })
    });

}

const deleteCart = async (req, res) => {
    var deleteCart = new Cart(req.body);
    CartService.deleteCart(deleteCart, function (err, resData) {
        if (err) {
            return res.send({
                message: "delete failse",
                errors: err,
                status: false,
            }).status(400)
        }
        res.send({
            message: "delete success!",
            data: resData,
            status: true
        })
    })
}

const getCart = async (req, res) => {
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

const searchCart = async (req, res) => {
    var search = req.body.cartId
    CartService.findCart(search, function (err, resData) {
        if (err) {
            return res.send({
                message: "Seach product failse",
                errors: err,
                status: false,
            }).status(400)
        }
        res.send({
            message: "Search succsess",
            data: resData,
            status: true
        })
    })
}
module.exports = {
    postCart, updateCart, deleteCart, getCart, searchCart
}