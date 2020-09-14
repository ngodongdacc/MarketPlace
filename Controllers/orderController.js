const Order = require("../Model/order");
const orderService = require("../Services/orderService");
const OrderService = require("../Services/orderService");


const createOrder = async(req, res) => {
    var newOrder = new Order({
        UserId: req.body.UserId,
        Product: req.body.Product,
        Amount: res.body.Amount,
        Price: res.body.Price,
        Name: req.body.Name,
        Address: req.body.Address,
        Payment: req.body.Payment,
        Status: req.body.Status,
        IntoMoney:req.body.IntoMoney,
        IdCart: req.body.IdCart
    })
    Order.create(newOrder,function(err, resData){
        if(err) res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err, status: false});
        res.json({
            message: "thêm đơn hàng success !",
            data: resData,
            status: true
        })
    })
}

const deleteOrder = async(req, res) => {
    var deleteOrder = {
        UserId: req.body.UserId,
        Product: req.body.Product,
        Amount: res.body.Amount,
        Price: res.body.Price,
        Name: req.body.Name,
        Address: req.body.Address,
        Payment: req.body.Payment,
        Status: req.body.Status,
        IntoMoney:req.body.IntoMoney,
        IdCart: req.body.IdCart
    }
    orderService.deleteOrder(deleteOrder, function(err, resData){
        if(err){
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

const updateOrder = async(req, res) => {
    var updateOrder = {
        UserId: req.body.UserId,
        Product: req.body.Product,
        Amount: res.body.Amount,
        Price: res.body.Price,
        Name: req.body.Name,
        Address: req.body.Address,
        Payment: req.body.Payment,
        Status: req.body.Status,
        IntoMoney:req.body.IntoMoney,
        IdCart: req.body.IdCart
    }
    OrderService.updateOrder(updateOrder, function(err, resData){
        if(err){
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
    })
}
const getOrder = async(req, res) => {
    var getOrder = {
        UserId: req.body.UserId,
        Product: req.body.Product,
        Amount: res.body.Amount,
        Price: res.body.Price,
        Name: req.body.Name,
        Address: req.body.Address,
        Payment: req.body.Payment,
        Status: req.body.Status,
        IntoMoney:req.body.IntoMoney,
        IdCart: req.body.IdCart
    };

    OrderService.getOrderById(getSubCate, function(err, resData){            
        if(err){
            return res.send({
                message: "get Category failse",
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

module.exports = {
    createOrder, deleteOrder, updateOrder,getOrder,
}