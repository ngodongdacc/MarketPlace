const express = require("express");
const router = express.Router();
const orderCtr = require("../Controllers/order_controller")
const {checkSignIn} = require("../middleware/auth")
// const {} = require("../validator/order/validatorOrder")


router.post("/create",checkSignIn(),orderCtr.create_order); // Tạo mới đơn hàng 
router.post("/update-info/:id",checkSignIn(),orderCtr.update_order_infor); // Cập nhật thông tin đơn hàng
router.get("/search-users",checkSignIn(),orderCtr.search_order_users); // Tìm kiếm đơn hàng của khách hàng
router.get("/detail/:id",checkSignIn(),orderCtr.detail_order); // Tìm kiếm đơn hàng của khách hàng
router.post("/cancel/:id",checkSignIn(),orderCtr.cancel_order); // Hủy đơn hàng

module.exports = router