var express = require('express');
var router = express.Router();

const SubCAtegoryCtr = require("../Controllers/SubCategoryController");

router.post('/create', SubCAtegoryCtr.createSubCategory);
router.post('/update', SubCAtegoryCtr.updateSubCategory);
router.post('/delete', SubCAtegoryCtr.deleteSubCategory);
router.get('/get', SubCAtegoryCtr.getSubCategory);

module.exports = router