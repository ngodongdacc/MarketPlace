const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderController")
const {checkSignIn} = require("../middleware/auth")
// const {} = require("../validator/order/validatorOrder")


router.post("/create",checkSignIn(),orderController.createOrder); 
router.post("/update/:id",orderController.updateOrder);
router.get("/get/:id",orderController.getOrder);
router.post("/delete/:id",orderController.deleteOrder);
router.get("/getOrderByUsers",orderController.getOrderByIdUsers);
router.get("/getOrderByCart",orderController.getOrderByCart);
router.get("/serchListOrderByShop",orderController.searchListOrderByShop);
router.post("/list/delete",orderController.deleteListOrder);
router.post("/updateStutus/:id",orderController.updateStatusOrder);
router.post("/cancelOrder/:id",orderController.cancelOrder)




module.exports = router