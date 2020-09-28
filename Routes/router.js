const express = require('express');
const router = express.Router();

router.use("/users",require('./usersRouter'))
router.use("/role",require('./roleRouter'))
router.use("/product",require('./productRouter'))
router.use("/shop",require('./shopRouter'))
router.use("/cart",require('./cartRouter'))
router.use("/category",require('./categoryRouter'))
router.use("/sub-category",require('./subcategoryRouter'))
router.use("/order",require('./orderRouter'))

router.use("/trademark", require('./trademarkRouter'))
router.use("/brandOrigin", require('./brandOriginRouter'))
router.use("/origin", require('./originRouter'))
module.exports = router;
