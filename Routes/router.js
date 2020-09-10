const express = require('express');
const router = express.Router();

<<<<<<< HEAD
// const usersRouter = require('./usersRouter');
// const danhmucRouter = require('./danhmucRouter');

router.use("/users",require('./usersRouter'))
// router.use("/danhmuc",danhmucRouter)

=======
const usersRouter = require('./usersRouter');
const danhmucRouter = require('./danhmucRouter');

router.use("/users",usersRouter)
router.use("/danhmuc",danhmucRouter)
>>>>>>> c8c7de46a2caca481d2d87d9a7367a22432c8de8
module.exports = router;
