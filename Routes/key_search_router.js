const express = require("express");
const router = express.Router();
const keySearchCtr = require("../Controllers/users/key_search_controller");
const {checkSignIn} = require("../middleware/auth");

router.get("/count",keySearchCtr.count_search); // Lấy các từ khóa được tìm kiếm nhiều nhất
router.get("/count-user",checkSignIn(),keySearchCtr.count_search_user); // Lấy các từ khóa của người dùng tìm kiếm nhiều nhất

module.exports = router