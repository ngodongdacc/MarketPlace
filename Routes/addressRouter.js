const express = require("express");
const router = express.Router();
const addressCtr = require("../Controllers/addressController");
const {checkSignIn} = require("../middleware/auth")

router.post("/",checkSignIn(), addressCtr.add_address);
router.post("/update/:id",checkSignIn(), addressCtr.update_address);

module.exports = router;