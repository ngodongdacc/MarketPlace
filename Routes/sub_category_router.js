const express = require('express');
const router = express.Router();

const SubCAtegoryCtr = require("../Controllers/categoris/sub_category_controller");

router.post('/create', SubCAtegoryCtr.createSubCategory);
router.post('/update', SubCAtegoryCtr.updateSubCategory);
router.post('/delete', SubCAtegoryCtr.deleteSubCategory);
router.get('/get', SubCAtegoryCtr.getSubCategory);

module.exports = router;
