const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderController")

router.post("/create",orderController.createOrder);
router.post("/update/:id",orderController.updateOrder);
router.get("/get",orderController.getOrder);
router.post("/delete/:id",orderController.deleteOrder);


module.exports = router