const Order = require("../Model/order");
const async = require("async");
const Users = require("../Model/users");
const userServic = require("../Services/usersService");
const { mongo, Mongoose } = require("mongoose");
const mongoose = require("mongoose");
const Product = require("../Model/product");
const { count } = require("../Model/product");
const order = require("../Model/order");
const Cart = require("../Model/cart")



module.exports = {
    createOrder: (req, res, next)=>{
        // const order = req.body
        // if(!order.UserId) return res.status(400).json({message: "Vui lòng nhập UserID", status:false});
        // if(!order.IdCart) return res.status(400).json({message: "Vui lòng nhập IdCart", status:false});
        // if(!order.Name) return res.status(400).json({message: "Vui lòng nhập Name", status: false});
        // if(!order.Products) return res.status(400).json({message: "Vui lòng nhập Products", status: false});


        // Order.create(order, (err,resData) => {
        //     if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false});
        //     res.json({
        //         message: "Tạo đơn hàng thành công !",
        //         data: resData,
        //         status: true
        //     })
        // })
        // console.log("request cart:: ", req);
        const { UserId, IdCart, Name, Price,Address,Payment,IntoMoney, Products, Phone, Status} = req.body;
        try{
            Cart.findOne({_id: IdCart}, async(err, resFindCart) => {

                if (err) return res.status(400).json({ message: "Giỏ hàng không tồn tại", errors: err, status: false });
                console.log(resFindCart);

                if(resFindCart) {
                    resFindCart.SubPrice = Price;
                    const money = Price * count[resFindCart.SubPrice]
                    Order.findOne({UserId: UserId}, async(err,resFindUser)=>{

                        if (err) return res.status(400).json({ message: "Không tìm thấy user", errors: err, status: false });
                        if(resFindUser){
                            resFindUser.IntoMoney = await Intomoneys;
                        var OrderUpdate = {};
                        OrderUpdate = await resFindUser;

                        Order.findOneAndUpdate({_id: resFindUser._id},{
                            Price: OrderUpdate.Price,
                            IntoMoney: OrderUpdate.money
                        }, function(err,resData){
                            if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                            res.json({
                                message: "Cập nhật mới sản phẩm vào giỏ hàng thành công",
                                status: true
                            })
                        });

                        }else {
                           resFindCart.SubPrice ==  Price;
                            IntoMoney ==  Price * count[resFindCart.SubPrice]
                            const Products = [];
                            Products.push(resFindCart)
                        };
                        Order.create({
                            UserId,
                            IdCart,
                            Products,
                            Price: Price,
                            Name,
                            Address,
                            Phone,
                            Payment,
                            Status,
                            IntoMoney: IntoMoney
                        }, function(err, resOrder) {
                            if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                            res.json({
                                message: "Thêm mới sản phẩm thành công",
                                data: resOrder,
                                status: true
                            })
                        })
                    })
                }
            })
        }catch (e) {
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

        Order.findByIdAndUpdate(resOrder._id, {$set: order},{},(err, resUpdate) => {
                if(err) {
                    return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false});
                }else if(resOrder.Status == 1) {
                    res.json({
                        message: "Huỷ đơn hàng thành công",
                        data: err,
                        status: true
                    })
                }else{
                    res.json({
                        message: "Cập nhật order thành công",
                        data: resUpdate,
                        status: true
                    })
                }
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
    }
}
