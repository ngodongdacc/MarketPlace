var express = require('express');
var router = express.Router();

const CategoryCtr = require("../Controllers/CategoryController");

router.post('/create', CategoryCtr.createCategory);
router.post('/update', CategoryCtr.updateCategory);
router.post('/delete', CategoryCtr.deleteCategory);
router.get('/get', CategoryCtr.getCategory);
router.post('/search', CategoryCtr.searchCategory)

module.exports = router