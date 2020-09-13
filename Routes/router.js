const express = require('express');
const router = express.Router();


const usersRouter = require('./usersRouter');
const categoryRouter = require('./categoryRouter');
const subCategoryRouter = require('./subcategoryRouter');


router.use("/users",usersRouter)
router.use("/category", categoryRouter)
router.use("/subcategory", subCategoryRouter)


module.exports = router;