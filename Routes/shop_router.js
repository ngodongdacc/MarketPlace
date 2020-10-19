const express = require('express');
const router = express.Router();
const {checkLogInShop,checkRoleShop,check_is_admin_shop} = require("../middleware/auth")
const shopCtr = require("../Controllers/shops/shop_controller");

router.post('/add', shopCtr.postshop); // thêm mới một cửa hàng
router.post('/login', shopCtr.post_login); // Đăng nhập
router.get('/list', checkLogInShop(),shopCtr.getShop); // lấy hết danh sách cửa hàng
router.get('/search',checkLogInShop(),checkRoleShop(10094), shopCtr.searchShop); // tìm kiếm cửa hàng theo danh sách từ khóa
router.post('/delete/list-shop',checkLogInShop(),checkRoleShop(10093),check_is_admin_shop(), shopCtr.delete_listShop); // xóa danh sách cửa hàng đã chọn
router.get('/shop-details',checkLogInShop(),checkRoleShop(10095), shopCtr.shop_details_forIdOwnerShop); // hiện thị thông tin chi tiết 1 cửa hàng
router.post('/update',checkLogInShop(),checkRoleShop(10092),shopCtr.updateShop); // cập nhật thông tin cửa hàng
// router.get('/delete/:id',checkLogInShop(), checkRole(),shopCtr.deleteShop); // xóa 1 cửa hàng
router.get("/logout", (req,res) => {
    req.logOut();
    res.redirect("/shop/login")
})


module.exports = router