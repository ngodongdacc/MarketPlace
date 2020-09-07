var express = require('express');
var router = express.Router();
const passport =  require("passport")

// Controllers
const UsersCtr = require("../Controllers/UsersController")

router.post('/', UsersCtr.postCreateUser); // Tạo mới tài khoản
router.post('/login', UsersCtr.postLogin); // Đăng nhập
router.get('/profile',passport.authenticate('jwt', { session: false }),UsersCtr.getProfile); // Lấy thông tin user

router.get("/logout", (req,res) => {
    req.logOut();
    res.redirect("/")
})

module.exports = router;
