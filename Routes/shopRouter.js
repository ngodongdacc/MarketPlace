var express = require('express');
var router = express.Router();

var shopCtr = require("../Controllers/ShopController");

router.post('/add', shopCtr.postshop);
router.post('/update', shopCtr.updateShop);
router.post('/delete', shopCtr.deleteShop);
router.get('/get', shopCtr.getShop);
router.post('/search', shopCtr.searchShop);
module.exports = router