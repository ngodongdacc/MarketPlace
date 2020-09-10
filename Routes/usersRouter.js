const express = require('express');
const router = express.Router();
// middleware
const {checkSignIn} = require("../middleware/auth")

// Controllers
const UsersCtr = require("../Controllers/UsersController")

// api/users/
router.post('/', UsersCtr.postCreateUser); // Tạo mới tài khoản
router.post('/users/login', UsersCtr.postLogin); // Đăng nhập
router.post('/users/update/:id',checkSignIn(), UsersCtr.postUpdate); // Cập nhật
router.get('/users/profile',checkSignIn(),UsersCtr.grantAccess("readOwn","users"),UsersCtr.getProfile); // Lấy thông tin user
router.post('/users/delete/:id',checkSignIn(),UsersCtr.grantAccess("deleteAny","users"),UsersCtr.postDeleteUser); // Lấy thông tin user
router.post('/users/role',checkSignIn(),UsersCtr.grantAccess("deleteAny","users"),UsersCtr.postDeleteUser); // Lấy thông tin user
router.get('/users/search',checkSignIn(),UsersCtr.grantAccess("readAny","users"),UsersCtr.getSearch); // Lấy thông tin user

router.get("/logout", (req,res) => {
    req.logOut();
    res.redirect("/")
})

module.exports = router;
