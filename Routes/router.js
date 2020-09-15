const express = require('express');
const router = express.Router();

<<<<<<< HEAD
router.use("/users",require('./usersRouter'))
router.use("/product",require('./productRouter'))
router.use("/shop",require('./shopRouter'))
router.use("/cart",require('./cartRouter'))
router.use("/category",require('./categoryRouter'))
router.use("/sub-category",require('./subcategoryRouter'))


module.exports = router;
=======
// const usersRouter = require('./usersRouter');
// const danhmucRouter = require('./danhmucRouter');
//const productRouter = require('./productRouter');
router.use("/users",require('./usersRouter'))
// router.use("/danhmuc",danhmucRouter)
router.use("/product", require('./productRouter'))
router.use("/trademark", require('./trademarkRouter'))
router.use("/brandOrigin", require('./brandOriginRouter'))
router.use("/origin", require('./originRouter'))
module.exports = router;
>>>>>>> hung
