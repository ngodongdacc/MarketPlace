const express = require("express");
const router = express.Router();
const rantingCtr = require("../../Controllers/products/rating_controller");

router.post("/add", rantingCtr.add_rating); // Xếp hạng của người dùng 
router.get("/list", rantingCtr.get_rating_product); // Lấy danh sách xếp hạng của sản phẩm 

module.exports = router