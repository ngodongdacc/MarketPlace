const Order = require("../Model/order");
const async = require("async");
const Users = require("../Model/users");
const userServic = require("../Services/usersService");
const cartServie = require("../Services/cartService")
const { mongo, Mongoose } = require("mongoose");
const mongoose = require("mongoose");
const Product = require("../Model/product");
const { count } = require("../Model/product");
const order = require("../Model/order");
const Cart = require("../Model/cart");
const cartService = require("../Services/cartService");
const e = require("express");



module.exports = {
    createOrder: (req, res, next)=>{
        
       const IdCart = req.body.IdCart
        const order = req.body
       const UserId = req.body.UserId
       const ProductId = req.body.ProductId
       if(!UserId) return res.status(400).json({message: "Vui lòng nhập Id", status:false});
       if(order.Name=== "") return res.status(400).json({ message: "Tên không được bỏ trống!", status: false, code: 0});

        try{
        
                    Cart.findOne({_id: IdCart}, async(err,resCart) => {
                        if (err) return res.status(400).json({ message: "Giỏ hàng không còn tồn tại", errors: err, status: false });
                        if(!resCart) return res.json({message: "Không tìm thấy ID CART", data: null, status: false});
                            var UserCart = resCart.UserId;
                            if(UserId == UserCart){
                                order.IntoMoney = resCart.SubPrice
                                order.Products = resCart.ListProduct
                                order.GrossProduct = resCart.SubTotal
                                Order.create(order,(err,resOrder) =>{
                                    if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false});
                                    resCart.ListProduct = [];
                                    resCart.SubTotal = 0;
                                    resCart.SubPrice = 0;
                                    Cart.findOneAndUpdate({_id: resCart._id }, {
                                        ListProduct: resCart.ListProduct,
                                        SubPrice: resCart.SubPrice,
                                        SubTotal: resCart.SubTotal
                                    },function(err, resDataCart) {
                                        if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý", errors:err , status: false});
                                        res.json({
                                            message: "Tạo đơn hàng thành công",
                                            data: resOrder,
                                            status: true
                                        })
                                    })
                                })
                            }else{
                                res.json({
                                    message: "Tạo đơn hàng thất bại",
                                    data: null,
                                    status: false
                                })
                            }
                    })
                    
        }catch (e){
            res.send({
                message: e.message,
                errors: e.errors,
                code: 0
            }).status(500) && next(e)
        }
    },



    updateOrder: (req,res) => {
        const order = req.body
        const id = req.params.id
        if(!id) return res.status(400).json({message: "Vui lòng nhập Id", status:false})
        Order.findById(id,(err, resOrder) => {
            if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false});
            if(!resOrder) return res.json({message: "Không tìm thấy id đơn hàng",data: null,status:false});
            Cart.findOne({_id: resOrder.IdCart},async(err, resCart) => {
                if (err) return res.status(400).json({ message: "OOP Lỗi Rồi", errors: err, status: false });
                if(!resCart) return res.json({message: "Không tìm thấy ID CART", data: null, status: false});
                // order.IntoMoney = resCart.SubPrice
                // order.Products = resCart.ListProduct
                // order.GrossProduct = resCart.SubTotal
                Order.findByIdAndUpdate(resOrder._id, {$set: order},{},(err, resUpdate) => {
                    if(err) {
                        return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false});
                    }else if(resUpdate.Status == 1) {
                        res.json({
                            message: "Đơn hàng đã xác nhận ",
                            data: resUpdate,
                            status: true
                        })
                    }else if(resUpdate.Status == 2) {
                        res.json({
                            message: "Đang giao hàng",
                            data: resUpdate,
                            status: true
                        })
                    }else if(resUpdate.Status == 3) {
                        res.json({
                            message: "Đã giao hàng",
                            data: resUpdate,
                            status: true
                        })
                    }else if(resUpdate.Status == 4) {
                        if(resUpdate.Reason == "") {
                            return res.status(400).json({ message: "Vui lòng điền lý do bạn huỷ đơn hàng", status: false, code: 0})
                        }else{
                            res.json({
                                message: "Huỷ đơn hàng",
                                data: resUpdate,
                                status: true
                            })
                        }
                    }else{
                        res.json({
                            message: "Đơn hàng đang chờ xác nhận!",
                            data: resUpdate,
                            status: true
                        })
                    }
                 })
            })
            })
    },
    getOrder: async(req, res) => {
        const id = req.params.id
        if(!id) return res.status(400).json({message: "Vui lòng nhập Id", status:false});


        Order.findById(id, (err,resOrder) => {
            if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lứ, vui lòng thử lại", er: err, status: false});
            if(!resOrder) return res.status(400).json({message: "Không tim thấy đơn hàng !", data: null, status: false});

            res.json({
                message: "Lấy chi tiết đơn hàng thành công",
                data: resOrder,
                status: true
            })
        })
    },
    deleteOrder: async(req,res) => {
        const id = req.params.id
        if(!id) return res.status(400).json({message: "Vui lòng nhập Id", status:false});

            Order.findById(id,(err, resOrder)=>{
                if(err) return res.stutus(400).json({message: "OOp lỗi rồi", err:err, status:false});
                if(!resOrder) return res.stutus(400).json({message: "không tìm đc ID này, vui lòng thử lại", data: null, status:false});

            Order.findByIdAndRemove(resOrder._id,function(err,resData){
                if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false});
                res.json({
                    message: "Xóa sản phẩm thành công",
                    data: resData,
                    status: true
                })
            })
        })
    },

    getOrderByIdUsers: async(req, res) => {
        const config = {};
        config.search =req.query.search || ""
        config.UserId = req.query.UserId
        config.page = req.query.page ? Number(req.query.page):1 
        config.limit = req.query.limit ? Number(req.query.limit):20 
        config.skip = (config.page-1)*config.limit;

        if(!config.UserId) return res.status(400).json({message: "Vui lòng nhập IdUser", status: false})
        const query = {
                UserId: new mongo.ObjectId(config.UserId),
                Name: {$regex: config.search, $options: "i"}
        }
        console.log(query);
        async.parallel([
            (cb) => 
            Order.find(query)
                    .skip(config.skip)
                    .limit(config.limit)
                    .sort({Name: "desc"})
                    .exec((e,data) => e ? cb(e): cb(null, data)),  
            (cb) => Order.count(query)
                    .exec((e,data)=> e ? cb(e) : cb(null,data))
        ],(err,results) => {
            console.log(err);
            if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false});
            res.json({
                message: "Lấy danh sách order thành công",
                data: {
                    Order: results[0],
                    count: results[1],
                },
                status: true
            }) 
        })
    },
    getOrderByCart: async(req, res)=>{
        const config = {};
        config.search = req.query.search || ""
        config.IdCart = req.query.IdCart
        config.page = req.query.page ? Number(req.query.page):1
        config.limit = req.query.limit ? Number(req.query.limit):20 
        config.skip = (config.page-1)*config.limit;

        if(!config.IdCart) return res.status(400).json({message: "Vui lòng nhập IdCategory", status: false})
        const query = {
                            Name: { $regex: config, $options: "i"},
                            IdCart: new mongoose.mongo.ObjectId(config.IdCart)
                    }
            async.parallel([
                (cb) => 
                Order.find(query)
                    .skip(config.skip)
                    .limit(config.limit)
                    .sort({Date: "desc"})
                    .exec((e,data) => e ? cb(e): cb(null, data)),
                (cb) => Order.count(query)
                        .exec((e,data)=> e ? cb(e) : cb(null, data))
            ],(err, results) => {
                if(err) if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false });
                res.json({
                    message: "Lấy danh sách đơn hàng thành công",
                    data: {
                        order: results[0],
                        count: results[1],
                    },
                    status: true
                })
            })
    },
}