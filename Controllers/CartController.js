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
               console.log("tess", resFindProduct);
                if (resFindProduct) {
                    resFindProduct.Quantity = 2;
                    const Total = Quantity * resFindProduct.Price;
                    Cart.findOne({ UserId: UserId }, async (err, resFindUser) => {
                        if (err) return res.status(400).json({ message: "Không tìm thấy user", errors: err, status: false });
                        if (resFindUser) {
                            const itemIndex = await resFindUser.ListProduct.findIndex(p => p._id == ProductId);
                            if (itemIndex > -1) {
                                //product exists in the cart, update the quantity
                                resFindUser.ListProduct[itemIndex].Quantity += Quantity;
                              let totals =await resFindUser.ListProduct.reduce((acc, next) => 
                                    acc + next.Quantity
                                ,0);
                                let prices =await resFindUser.ListProduct.reduce((acc, next) => 
                                acc + (next.Price*next.Quantity) 
                            ,0);
                                resFindUser.SubTotal=await totals;
                                resFindUser.SubPrice=await prices;
                                console.log("res",resFindUser)
                                let CartUpdate={};
                                CartUpdate=await resFindUser;
                                Cart.findOneAndUpdate({_id:resFindUser._id}, {ListProduct: CartUpdate.ListProduct,
                                    SubTotal:CartUpdate.SubTotal,
                                    SubPrice:CartUpdate.SubPrice
                                
                                }, function (err, resData) {
                                    if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                                  console.log(resData)
                                    res.json({
                                        message: "Cập nhật mới sản phẩm vào giỏ hàng thành công",
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
                                        status: true
                                    })

                                });
                            }
                        } else {
                            //no cart for user, create new cart
                            const SubTotal = Total;
                            const    SubPrice =Quantity *resFindProduct.Price;
                            const ListProduct=[];
                         ListProduct.push(
                                resFindProduct
                            );
                         console.log("quantity: ",Quantity)
                            Cart.create({
                                UserId,
                                ListProduct,
                                Des,
                                Title,
                                SubTotal,
                                SubPrice
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
        console.log(UserId)
        Cart.findOne({ UserId: UserId }, async (err, resFindUser) => {
            if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
            if (!resFindUser) return res.status(400).json({ message: "Không tìm thấy User", data: null, status: false });
            if (resFindUser) {
                resFindUser.ListProduct.findIndex(p => p._id == ProductId) !== -1 && resFindUser.ListProduct.splice(resFindUser.ListProduct.findIndex(p => p._id == ProductId), 1)

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
        const {UserId } = req.query
        Cart.findOne({ UserId: new mongoose.mongo.ObjectId(UserId)}, function (err, resData) {
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