var express = require('express');
var router = express.Router();

var shopCtr = require("../Controllers/ShopController");

router.post('/add', shopCtr.postshop);
router.post('/update', shopCtr.postshop);
router.post('/delete', shopCtr.postshop);
router.get('/get', shopCtr.postshop);

module.exports = router