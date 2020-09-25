const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderController")

const {checkSignIn} = require("../middleware/auth")

router.post("/create",checkSignIn(),orderController.createOrder);
router.post("/update/:id",orderController.updateOrder);
router.get("/get/:id",orderController.getOrder);
router.post("/delete/:id",orderController.deleteOrder);
router.get("/getOrderByUsers",orderController.getOrderByIdUsers);
router.get("/getOrderByCart",orderController.getOrderByCart);
// router.get("/serchListOrderByShop",orderController.searchListOrderByShop);
router.post("/list/delete",orderController.deleteListOrder);






module.exports = router