const express = require('express');
const router = express.Router();

const cartCtr = require("../Controllers/CartController");

router.post('/add', cartCtr.postCart);
router.post('/update', cartCtr.postCart);
router.post('/delete', cartCtr.deleteCart);
router.post('/delete-quantity', cartCtr.delete_Quantity_OfCart);
router.get('/deleteAllProduct/:id', cartCtr.delete_All_ForUser);
router.get('/get', cartCtr.getCart);
router.get('/', cartCtr.showCartForUser);
// router.post('/search', cartCtr.searchCart);
module.exports = router