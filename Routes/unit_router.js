var express = require('express');
var router = express.Router();
const {checkSignIn} = require("../middleware/auth");

var unitCtr = require("../Controllers/customs_product/unit_controller");

router.post('/add', unitCtr.create_unit);
router.post('/update/:id',checkSignIn(), unitCtr.update_unit);
router.post('/delete/:id',checkSignIn(), unitCtr.remove_unit);
router.get('',checkSignIn(), unitCtr.get_units);
router.get('/get/:id',checkSignIn(), unitCtr.get_unit);
router.get("/list",checkSignIn(),unitCtr.get_list_unit);
router.post("/list/delete",checkSignIn(),unitCtr.remove_list_unit);
router.get('/search',checkSignIn(), unitCtr.search_unit);
module.exports = router