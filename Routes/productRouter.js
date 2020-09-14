const express = require('express');
const router = express.Router();
const productCtr = require("../Controllers/productController");

router.post('/add', productCtr.postcreateProduct);
router.post('/sua', productCtr.postcreateProduct);
router.post('/xoa', productCtr.postcreateProduct);
router.get('/lay', productCtr.postcreateProduct);



module.exports = router;