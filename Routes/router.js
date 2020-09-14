const express = require('express');
const router = express.Router();

router.use("/users",require('./usersRouter'))
router.use("/shop",require('./shopRouter'))
router.use("/cart",require('./cartRouter'))
router.use("/category",require('./categoryRouter'))
router.use("/sub-category",require('./subcategoryRouter'))
router.use("/order",require('./orderRouter'))

module.exports = router;