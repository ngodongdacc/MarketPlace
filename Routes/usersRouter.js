const express = require('express');
const router = express.Router();
// middleware
const {checkSignIn} = require("../middleware/auth");

// Controllers
const UsersCtr = require("../Controllers/UsersController")

// api/users/
router.post('/', UsersCtr.post_create_user); // Tạo mới tài khoản
router.post('/login', UsersCtr.post_login); // Đăng nhập
router.post('/update/:id',checkSignIn(), UsersCtr.post_update); // Cập nhật
router.get('/profile',checkSignIn(),UsersCtr.grantAccess("readOwn","users"),UsersCtr.get_profile); // Lấy thông tin user
router.post('/delete/:id',checkSignIn(),UsersCtr.grantAccess("updateOwn","users"),UsersCtr.postDeleteUser); // Lấy thông tin user
router.post('/role',checkSignIn(),UsersCtr.grantAccess("deleteOwn","users"),UsersCtr.postDeleteUser); // Lấy thông tin user
router.post('/remove/list',UsersCtr.remove_list_user); // xóa danh sách người dùng
router.get('/search',UsersCtr.get_search); // Lấy thông tin user
router.get('/getAll',UsersCtr.get_all_user); // Lấy tất cả user

router.get("/logout", (req,res) => {
    req.logOut();
    res.redirect("/")
})

module.exports = router;
