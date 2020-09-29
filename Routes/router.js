const express = require('express');
const router = express.Router();

router.use("/users",require('./usersRouter'));  // Người dùng
router.use("/address",require('./addressRouter')); // Đỉa chỉ người dùng
router.use("/role",require('./roleRouter')); // Phân quyền người dùng
router.use("/product",require('./productRouter')); // Sản phẩm
router.use("/key-search",require('./keySearchRouter')); // Sản phẩm
router.use("/shop",require('./shopRouter')); // Cửa hàng
router.use("/cart",require('./cartRouter')); // Giỏ hàng
router.use("/post",require('./commentRouter')); // Bài đăng  của sản phẩm
router.use("/category",require('./categoryRouter')); // Danh mục 
router.use("/sub-category",require('./subcategoryRouter')); // Danh mục con
router.use("/order",require('./orderRouter')); // Đơn hàng

router.use("/trademark", require('./trademarkRouter'))  // 
router.use("/brandOrigin", require('./brandOriginRouter')) //
router.use("/origin", require('./originRouter')) //
router.use("/unit", require('./unitRouter')) //
module.exports = router;
