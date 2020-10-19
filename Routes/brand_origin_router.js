const express = require('express');
const router = express.Router();
const brandOriginCtr = require("../Controllers/customs_product/brand_origin_controller");
const {checkSignIn} = require("../middleware/auth");

router.post('/add', brandOriginCtr.create_brandOrigin);
router.post('/update/:id', brandOriginCtr.update_brandOrigin);
router.post('/delete/:id', brandOriginCtr.remove_brandOrigin);
router.get('',brandOriginCtr.getProfile);
router.get('/get/:id', brandOriginCtr.get_brandOrigin);
router.get('/search', brandOriginCtr.search_brandOrigin);
router.get("/list",brandOriginCtr.get_list_brandOrigin);
router.post("/list/delete",brandOriginCtr.remove_list_brandOrigin);


module.exports = router;