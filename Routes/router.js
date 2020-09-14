const express = require('express');
const router = express.Router();

// const usersRouter = require('./usersRouter');
// const danhmucRouter = require('./danhmucRouter');
//const productRouter = require('./productRouter');
router.use("/users",require('./usersRouter'))
// router.use("/danhmuc",danhmucRouter)
router.use("/product", require('./productRouter'))
router.use("/trademark", require('./trademarkRouter'))
router.use("/brandOrigin", require('./brandOriginRouter'))
module.exports = router;
