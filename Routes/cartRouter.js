var express = require('express');
var router = express.Router();

var cartCtr = require("../Controllers/CartController");

router.post('/add', cartCtr.postCart);
router.post('/update', cartCtr.postCart);
router.post('/delete', cartCtr.deleteCart);
router.get('/deleteAllProduct/:id', cartCtr.delete_All_ForUser);
router.get('/get', cartCtr.getCart);
router.get('/', cartCtr.showCartForUser);
// router.post('/search', cartCtr.searchCart);
module.exports = router