const express = require('express');
const router = express.Router();
// middleware
const {checkSignIn} = require("../middleware/auth")

// Controllers
const UsersCtr = require("../Controllers/UsersController")

// api/users/
router.post('/', UsersCtr.postCreateUser); // Tạo mới tài khoản
router.post('/login', UsersCtr.postLogin); // Đăng nhập
router.post('/update/:id',checkSignIn(), UsersCtr.postUpdate); // Cập nhật
router.get('/profile',checkSignIn(),UsersCtr.grantAccess("readOwn","users"),UsersCtr.getProfile); // Lấy thông tin user
router.post('/delete/:id',checkSignIn(),UsersCtr.grantAccess("deleteAny","users"),UsersCtr.postDeleteUser); // Lấy thông tin user
router.post('/role',checkSignIn(),UsersCtr.grantAccess("deleteAny","users"),UsersCtr.postDeleteUser); // Lấy thông tin user
router.post('/remove/list',UsersCtr.remove_list_user); // Lấy thông tin user
router.get('/search',UsersCtr.getSearch); // Lấy thông tin user
router.get('/getAll',UsersCtr.get_all_user); // Lấy tất cả user

router.get("/logout", (req,res) => {
    req.logOut();
    res.redirect("/")
})

module.exports = router;
