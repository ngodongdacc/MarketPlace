"use strict";

var express = require("express");

var router = express.Router();

var orderController = require("../Controllers/orderController");

var _require = require("../middleware/auth"),
    checkSignIn = _require.checkSignIn; // const {} = require("../validator/order/validatorOrder")


router.post("/create", checkSignIn(), orderController.createOrder);
router.post("/update/:id", orderController.updateOrder);
router.get("/get/:id", orderController.getOrder);
router.post("/delete/:id", orderController.deleteOrder);
router.get("/getOrderByUsers", orderController.getOrderByIdUsers);
router.get("/getOrderByCart", orderController.getOrderByCart);
router.get("/serchListOrderByShop", orderController.searchListOrderByShop);
router.post("/list/delete", orderController.deleteListOrder);
router.post("/updateStutus/:id", orderController.updateStatusOrder);
router.post("/cancelOrder/:id", orderController.cancelOrder);
module.exports = router;