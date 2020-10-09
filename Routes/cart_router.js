const express = require('express');
const router = express.Router();
const {checkSignIn,checkRole} = require("../middleware/auth")
const cartCtr = require("../Controllers/cart_controller");

router.post('/add',checkSignIn(),checkRole(10051), cartCtr.postCart);
// router.post('/update',checkSignIn(),checkRole(10050), cartCtr.postCart);
router.post('/delete',checkSignIn(),checkRole(10053), cartCtr.deleteCart);
router.post('/delete-quantity',checkSignIn(),checkRole(10052), cartCtr.delete_Quantity_OfCart);
router.post('/delete-all-product',checkSignIn(),checkRole(10054), cartCtr.delete_All_ForUser);
// router.get('/get',checkSignIn(), cartCtr.getCart);
router.get('/',checkSignIn(),checkRole(10050), cartCtr.showCartForUser);
// router.post('/search', cartCtr.searchCart);
module.exports = router