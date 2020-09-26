var express = require('express');
var router = express.Router();
const {checkSignIn} = require("../middleware/auth")
var shopCtr = require("../Controllers/ShopController");

router.post('/add', shopCtr.postshop); // thêm mới một cửa hàng
router.post('/login', shopCtr.post_login); // Đăng nhập
router.get('/list', shopCtr.getShop); // lấy hết danh sách cửa hàng
// router.get('/search', shopCtr.searchShop); // chưa đc
router.post('/delete/list-shop', shopCtr.delete_listShop); // xóa danh sách cửa hàng đã chọn
router.get('/shop-details', shopCtr.shop_details_forIdOwnerShop); // hiện thị thông tin chi tiết 1 cửa hàng
router.post('/update/:id',shopCtr.updateShop); // cập nhật thông tin cửa hàng
router.get('/delete/:id', shopCtr.deleteShop); // xóa 1 cửa hàng



module.exports = router