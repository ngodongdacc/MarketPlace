var express = require('express');
var router = express.Router();
const {checkSignIn,checkLogInShop} = require("../middleware/auth")
var shopCtr = require("../Controllers/ShopController");

router.post('/add', shopCtr.postshop); // thêm mới một cửa hàng
router.post('/login', shopCtr.post_login); // Đăng nhập
router.get('/list', checkLogInShop(),shopCtr.getShop); // lấy hết danh sách cửa hàng
router.post('/search',checkLogInShop(), shopCtr.searchShop); // tìm kiếm cửa hàng theo danh sách từ khóa
router.post('/delete/list-shop',checkLogInShop(), shopCtr.delete_listShop); // xóa danh sách cửa hàng đã chọn
router.get('/shop-details',checkLogInShop(), shopCtr.shop_details_forIdOwnerShop); // hiện thị thông tin chi tiết 1 cửa hàng
router.post('/update/:id',checkLogInShop(),shopCtr.updateShop); // cập nhật thông tin cửa hàng
router.get('/delete/:id',checkLogInShop(), shopCtr.deleteShop); // xóa 1 cửa hàng
router.get("/logout", (req,res) => {
    req.logOut();
    res.redirect("/shop/login")
})


module.exports = router