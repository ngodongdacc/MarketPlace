const express = require('express');
const router = express.Router();
const {checkSignIn} = require("../middleware/auth")
const cartCtr = require("../Controllers/CartController");

router.post('/add',checkSignIn(), cartCtr.postCart);
router.post('/update',checkSignIn(), cartCtr.postCart);
router.post('/delete',checkSignIn(), cartCtr.deleteCart);
router.post('/delete-quantity',checkSignIn(), cartCtr.delete_Quantity_OfCart);
router.get('/deleteAllProduct/:id',checkSignIn(), cartCtr.delete_All_ForUser);
router.get('/get',checkSignIn(), cartCtr.getCart);
router.get('/',checkSignIn(), cartCtr.showCartForUser);
// router.post('/search', cartCtr.searchCart);
module.exports = router