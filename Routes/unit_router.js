var express = require('express');
var router = express.Router();
const {checkSignIn} = require("../middleware/auth");

var unitCtr = require("../Controllers/customs_product/unit_controller");

router.post('/add', unitCtr.create_unit);
router.post('/update/:id', unitCtr.update_unit);
router.post('/delete/:id',unitCtr.remove_unit);
router.get('',unitCtr.get_units);
router.get('/get/:id',unitCtr.get_unit);
router.get("/list",unitCtr.get_list_unit);
router.post("/list/delete",unitCtr.remove_list_unit);
router.get('/search', unitCtr.search_unit);
module.exports = router;
