const Order = require("../Model/order");
const async = require("async");
const mongoose = require("mongoose");
const Cart = require("../Model/cart");

const { isEmail, isPhone } = require("../validator/validator");
const { error_400, error_500, success } = require("../validator/errors");

module.exports = {

    // Tạo mới đơn hàng
    create_order: (req, res) => {
        try {
            const order = req.body;
            let id = req.user._id
            if (!id || id === "")
                return error_400(res, "Vui lòng đăng nhập", "Login");

            if (!order.Name || order.Name === "")
                return error_400(res, "Vui lòng nhập tên người nhận", "Name");

            if (!order.Address || order.Address === "")
                return error_400(res, "Vui lòng nhập địa chỉ giao hàng", "Address");

            if (!order.Phone || order.Phone === "")
                return error_400(res, "Vui lòng nhập số điện thoại", "Phone");

            if (!isPhone(order.Phone))
                return error_400(res, "Số điện thoại không đúng", "Phone")

            if (!order.Email || order.Email === "")
                return error_400(res, "Vui lòng nhập Email!", "Email");

            if (!isEmail(order.Email))
                return error_400(res, "Email không đúng định dạng", "Email");

            if (!order.Payment || order.Payment === "")
                return error_400(res, "Vui lòng chọn hình thức giao hàng", "Payment");

            Cart.findOne({ UserId: id }, async (err, resCart) => {
                if (err) return error_500(res, err);
                if (!resCart)
                    return error_400(res, "Không tìm thấy giỏ hàng", "Cart");
                if (resCart.ListProduct.length === 0)
                    return error_400(res, "Giỏ hàng không có sản phẩm", "Product");
                console.log("cart:: ", resCart);
                let newOrder = new Order({
                    UserId: id,
                    Products: resCart.ListProduct,
                    Name: order.Name,
                    Email: order.Email,
                    Phone: order.Phone,
                    Address: order.Address,
                    Payment: order.Payment,
                    Status: 0,
                    IntoMoney: resCart.SubPrice,
                    GrossProduct: resCart.SubTotal,
                    IdCart: resCart._id,
                    CreateAt: Date.now(),
                    UpdateAt: Date.now()
                })

                Order.create(newOrder, (e, resOrder) => {
                    if (e) return error_500(res, e);

                    // Xóa hết sản phẩm trong giỏ hàng
                    Cart.findByIdAndUpdate(resCart._id, {
                        $set: {
                            ListProduct: [],
                            SubTotal: 0,
                            SubPrice: 0
                        }
                    }, { new: true })
                        .exec((e, upCart) => {
                            if (e) return error_500(res, e)
                            success(res, "Tạo đơn hàng thành công", {
                                order: resOrder,
                                cart: upCart
                            })
                        })
                })
            })
        } catch (e) {
            error_500(res, e)
        }
    },

    // Cập nhật thông tin đơn hàng
    update_order_infor: (req, res) => {
        let { info } = req.body;
        let idOrder = req.params.id;
        let idUser = req.user._id;

        if (!idUser || idUser === "") {
            return error_400(res, "Vui lòng đăng nhập", "Login");
        }

        if (!idOrder || idOrder === "") {
            return error_400(res, "Vui lòng nhập id đơn hàng", "idOrder");
        }
        if (!mongoose.Types.ObjectId.isValid(idOrder)){
            return error_400(res, "Vui lòng nhập id dạng ObjectId", "id");
        }
        if (info && info.Name && info.Name === "") {
            return error_400(res, "Vui lòng nhập tên người nhận", "info.Name");
        }
        if (info && info.Address && info.Address === "") {
            return error_400(res, "Vui lòng nhập địa chỉ giao hàng", "info.Address");
        }
        if (info && info.Phone && info.Phone === "") {
            return error_400(res, "Vui lòng nhập số điện thoại", "info.Phone");
        }
        if (info && info.Phone && !isPhone(info.Phone)) {
            return error_400(res, "Số điện thoại không đúng", "info.Phone")
        }
        if (info && info.Email && info.Email === "") {
            return error_400(res, "Vui lòng nhập Email!", "info.Email");
        }
        if (info && info.Email && !isEmail(info.Email)) {
            return error_400(res, "Email không đúng định dạng", "Email");
        }
        if (info && info.Payment && info.Payment === "") {
            return error_400(res, "Vui lòng chọn hình thức giao hàng", "Payment");
        }

        Order.findOne({ _id: idOrder, UserId: idUser })
            .exec((e, resFindOrder) => {
                if (e) return error_500(res, e);
                if (!resFindOrder)
                    return error_400(res, "Không tìm thấy đơn hàng", "idOrder");

                let updateInforOrder = { UpdateAt: Date.now() };
                if (info && info.Name) updateInforOrder.Name = info.Name;
                if (info && info.Phone) updateInforOrder.Phone = info.Phone;
                if (info && info.Address) updateInforOrder.Address = info.Address;
                if (info && info.Email) updateInforOrder.Email = info.Email;
                if (info && info.Payment) updateInforOrder.Payment = info.Payment;

                Order.findByIdAndUpdate(idOrder, { $set: updateInforOrder },
                    { new: true })
                    .exec((e, result) => {
                        if (e) error_500(res, e);
                        success(res, "Cập nhật thông tin đơn hàng thành công", result)
                    })
            })
    },

    // Tim kiem đơn hàng của khách hàng
    search_order_users: async (req, res) => {
        let idUser = req.user._id;
        let params = req.query;

        if (!idUser)
            return error_400(res, "Vui lòng đăng nhập", "Login");

        if (params.sort && !IsJsonString(params.sort))
            return error_500(res, "sort phải là dạng json", "sort");

        let limit = params.limit ? Number(params.limit) : process.env.LIMIT || 20
        let page = params.page ? Number(params.limit) : process.env.PAGE || 1
        let skip = (page - 1) * limit;
        let sort = params.sort ? JSON.parse(params.sort) : { CreateAt: -1 };

        let query = {
            $and: [
                {
                    UserId: new mongoose.mongo.ObjectId(idUser),
                }
            ]
        };

        if (params.search && params.search !== "") {
            query.$or = [
                { $text: { $search: req.query.search } }
            ]
        }

        async.parallel([
            cb => Order.aggregate([{ $match: query }])
                .skip(skip)
                .limit(limit)
                .sort(sort)
                .exec((e, O) => e ? cb(e) : cb(null, O)),
            cb => Order.countDocuments(query).exec((e, c) => e ? cb(e) : cb(null, c))
        ], (e, results) => {
            console.log("test");
            if (e) return error_500(res, e);
            success(res, "Lấy danh sách đơn hàng thành công", {
                orders: results[0],
                count: results[1]
            })
        })
    },

    // Hủy đơn hàng
    cancel_order: (req, res) => {
        let idUser = req.user._id;
        let idOrder = req.params.id

        if (!idUser) return error_400(res, "Vui lòng đăng nhập", "Login");
        if (!idOrder) return error_400(res, "Vui lòng nhập id đơn hàng", "id");
        if (!mongoose.Types.ObjectId.isValid(idOrder))
            return error_400(res, "Vui lòng nhập id dạng ObjectId", "id");

        Order.findOne({ _id: idOrder, UserId: idUser })
            .exec((e, order) => {
                if (e) return error_500(res, e);
                if (!order) 
                    return error_400(res, "Không tìm thấy đơn hàng", "id");
                if(order.Status !== 0) 
                    return error_400(res, "Đơn hàng không thể hủy", "Status");

                Order.findByIdAndUpdate(order._id, { Status: 4 }, { new: true })
                    .exec((e, r) =>
                        e ? error_500(res, e) : success(res, "Hủy đơn hàng thành công", r))
            })
    },

    //Lấy chi tiết đơn hàng của khách hàng
    detail_order: (req,res) => {
        let idUser = req.user._id;
        let idOrder = req.params.id

        if (!idUser) return error_400(res, "Vui lòng đăng nhập", "Login");
        if (!idOrder) return error_400(res, "Vui lòng nhập id đơn hàng", "id");
        console.log(idOrder);
        if (!mongoose.Types.ObjectId.isValid(idOrder))
            return error_400(res, "Vui lòng nhập id dạng ObjectId", "id");

            Order.findOne({ _id: idOrder, UserId: idUser })
            .exec((e, order) => {
                if (e) return error_500(res, e);
                if (!order) 
                    return error_400(res, "Không tìm thấy đơn hàng", "id");
                
                success(res,"Lấy chi tiết đơn hàng thành công",order)
            })
    }
}

