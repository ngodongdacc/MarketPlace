const express = require('express');
const router = express.Router();

router.use("/book",require('./book_router')) // book test

router.use("/users",require('./user_router'));  // Người dùng
router.use("/address",require('./address_router')); // Đỉa chỉ người dùng
router.use("/role",require('./role_router')); // Phân quyền người dùng
router.use("/role-shop",require('./role_shop_router')); // Phân quyền shop người dùng
router.use("/product",require('./product_router')); // Sản phẩm

router.use("/key-search",require('./key_search_router')); // Từ khóa tìm kiếm
router.use("/shop",require('./shop_router')); // Cửa hàng
router.use("/cart",require('./cart_router')); // Giỏ hàng
router.use("/category",require('./category_router')); // Danh mục 

router.use("/sub-category",require('./sub_category_router')); // Danh mục con
router.use("/order",require('./order_router')); // Đơn hàng
router.use("/comment",require('./comment_router')) // Nhận xét của sản phẩm


router.use("/trademark", require('./trademark_router'))  // 
router.use("/brandOrigin", require('./brand_origin_router')) //
router.use("/origin", require('./origin_router')) //
router.use("/unit", require('./unit_router')) //
module.exports = router;
