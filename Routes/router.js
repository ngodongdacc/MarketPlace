const express = require('express');
const router = express.Router();

router.use("/users",require('./usersRouter'))
router.use("/product",require('./productRouter'))
router.use("/shop",require('./shopRouter'))
router.use("/cart",require('./cartRouter'))
router.use("/category",require('./categoryRouter'))
router.use("/sub-category",require('./subcategoryRouter'))


module.exports = router;