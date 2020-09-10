const express = require('express');
const router = express.Router();

// const usersRouter = require('./usersRouter');
// const danhmucRouter = require('./danhmucRouter');

<<<<<<< HEAD
router.use("/users",require('./usersRouter'))
=======
router.use("/users",require('./usersRouter'));
router.use("/shop",require('./shopRouter'))
>>>>>>> e51a06ae0d9c2e570e14cec67ffa074db3f72bdb
// router.use("/danhmuc",danhmucRouter)

module.exports = router;
