const express = require('express');
const router = express.Router();

const {checkSignIn, checkRole} = require("../middleware/auth")
const roleCtr = require("../Controllers/roleController");

router.post("/", roleCtr.create_role);
router.get("/search",checkSignIn(), checkRole(3),roleCtr.search);

module.exports = router;