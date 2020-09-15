const Order = require("../Model/order");
const async = require("async");
const Users = require("../Model/users");
const userServic = require("../Services/usersService");

module.exports = {
    createOrder: (req, res)=>{
        const order = req.body
        if(!order.UserId) return res.status(400).json({message: "Vui lòng nhập UserID", status:false});
        if(!order.IdCart) return res.status(400).json({message: "Vui lòng nhập IdCart", status:false});
        if(!order.Name) return res.status(400).json({message: "Vui lòng nhập Name", status: false});

        Order.create(order, (err,resData) => {
            if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false});
            res.json({
                message: "Tạo đơn hàng thành công !",
                data: resData,
                status: true
            })
        })
    },
    updateOrder: (req,res) => {
        const order = req.body
        const id = req.params.id
        if(!id) return res.status(400).json({message: "Vui lòng nhập Id", status:false})
        Order.findById(id,(err, resOrder) => {
            if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false});
            if(!resOrder) return res.json({message: "Không tìm thấy id đơn hàng",data: null,status:false});

        Order.findByIdAndUpdate(resOrder._id, {$set: order},options,(err, resUpdate) => {
                if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false});
                res.json({
                    message: "Cập nhật order thành công",
                    data: resUpdate,
                    status: true
                })
             })
        })
    },
    getOrder: async(req, res) => {
        const id = req.body.id
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
    }
}


