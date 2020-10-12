const express = require('express');
const router = express.Router();

const {checkSignIn, checkRole} = require("../middleware/auth")
const roleCtr = require("../Controllers/users/role_controller");

router.post("/", roleCtr.create_role);
router.get("/search",checkSignIn(), checkRole(3),roleCtr.search);
router.post("/add",checkSignIn(),roleCtr.add_role);

module.exports = router;