const express = require("express");
const router = express.Router();
const rantingCtr = require("../../Controllers/products/rating_controller");
const {checkSignIn} = require("../../middleware/auth");

router.post("/add", checkSignIn(), rantingCtr.add_rating); // Xếp hạng của người dùng 
router.get("/counts", rantingCtr.counts_rating_product); // Lấy danh sách số lượng xếp hạng của sản phẩm 

module.exports = router