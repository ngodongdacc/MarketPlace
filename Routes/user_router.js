const express = require('express');
const router = express.Router();
// middleware
const { checkSignIn, checkRole,check_login_facebook } = require("../middleware/auth");

// Controllers
const UsersCtr = require("../Controllers/users/user_controller");
const loginUserCtr = require("../Controllers/users/login_controller");

// api/users/
router.post('/', UsersCtr.post_create_user); // Tạo mới tài khoản
router.post('/login', UsersCtr.post_login); // Đăng nhập
router.post('/login/facebook',check_login_facebook(), loginUserCtr.login_facbook); // Đăng nhập facebook

router.post('/update/:id', checkSignIn(), checkRole(10002), UsersCtr.post_update); // Cập nhật
router.get('/profile', checkSignIn(), checkRole(10001), UsersCtr.get_profile); // Lấy thông tin user
router.get('/profile/:id', checkSignIn(), checkRole(10005), UsersCtr.get_profile_id); // Lấy thông tin user của tài khoản khác
router.post('/delete/:id', checkSignIn(), UsersCtr.postDeleteUser); // Xóa thông tin user bằng id

router.post('/role', checkSignIn(), UsersCtr.postDeleteUser); // Lấy thông tin user
router.post('/remove/list', checkRole(10003), UsersCtr.remove_list_user); // xóa danh sách người dùng
router.get('/search', checkRole(10004), UsersCtr.get_search); // Lấy thông tin user
router.get('/getAll', UsersCtr.get_all_user); // Lấy tất cả user

router.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/")
})

module.exports = router;
