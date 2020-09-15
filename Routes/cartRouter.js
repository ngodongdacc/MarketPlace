var express = require('express');
var router = express.Router();

var cartCtr = require("../Controllers/CartController");

router.post('/add', cartCtr.postCart);
router.post('/update', cartCtr.postCart);
router.post('/delete', cartCtr.deleteCart);
router.get('/get', cartCtr.getCart);
// router.post('/search', cartCtr.searchCart);
module.exports = router