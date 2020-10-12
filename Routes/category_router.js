const express = require('express');
const router = express.Router();
const { checkSignIn, check_is_admin } = require("../middleware/auth");

const CategoryCtr = require("../Controllers/categoris/category_controller");

router.post('/create',checkSignIn(), check_is_admin(), CategoryCtr.createCategory);
router.post('/update/:id',checkSignIn(), check_is_admin(), CategoryCtr.updateCategory);
router.post('/delete',checkSignIn(), check_is_admin(), CategoryCtr.deleteCategory);
router.get('/get', CategoryCtr.getCategory);
router.get('/detail/:id', CategoryCtr.get_detail_category);
router.post('/search', CategoryCtr.searchCategory)

module.exports = router;