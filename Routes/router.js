const express = require('express');
const router = express.Router();

// const usersRouter = require('./usersRouter');
// const danhmucRouter = require('./danhmucRouter');

router.use("/users",require('./usersRouter'))
router.use("/shop",require('./shopRouter'))
router.use("/category",require('./categoryRouter'))
router.use("/sub-category",require('./subcategoryRouter'))
// router.use("/danhmuc",danhmucRouter)

module.exports = router;
