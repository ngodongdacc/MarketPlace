const express = require('express');
const router = express.Router();


const CategoryCtr = require("../Controllers/CategoryController");

router.post('/create', CategoryCtr.createCategory);
router.post('/update/:id', CategoryCtr.updateCategory);
router.post('/delete', CategoryCtr.deleteCategory);
router.get('/get', CategoryCtr.getCategory);
router.post('/search', CategoryCtr.searchCategory)

module.exports = router;