const express = require('express');
const router = express.Router();

<<<<<<< HEAD
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
=======
router.use("/users",require('./usersRouter'))
router.use("/role",require('./roleRouter'))
router.use("/product",require('./productRouter'))
router.use("/shop",require('./shopRouter'))
router.use("/cart",require('./cartRouter'))
router.use("/comment",require('./commentRouter')) // Comment  của sản phẩm
router.use("/category",require('./categoryRouter'))
router.use("/sub-category",require('./subcategoryRouter'))
router.use("/order",require('./orderRouter'))
>>>>>>> tech24_Kokoro

router.use("/trademark", require('./trademarkRouter'))  // 
router.use("/brandOrigin", require('./brandOriginRouter')) //
router.use("/origin", require('./originRouter')) //
router.use("/unit", require('./unitRouter')) //
module.exports = router;
