const express = require('express');
const router = express.Router();
const brandOriginCtr = require("../Controllers/customs_product/brand_origin_controller");
const {checkSignIn} = require("../middleware/auth");

router.post('/add',checkSignIn(), brandOriginCtr.create_brandOrigin);
router.post('/sua/:id',checkSignIn(), brandOriginCtr.update_brandOrigin);
router.post('/xoa/:id',checkSignIn(), brandOriginCtr.remove_brandOrigin);
router.get('',checkSignIn(), brandOriginCtr.getProfile);
router.get('/get/:id',checkSignIn(), brandOriginCtr.get_brandOrigin);
router.get('/search',checkSignIn(), brandOriginCtr.search_brandOrigin);
router.get("/list",checkSignIn(),brandOriginCtr.get_list_brandOrigin);
router.post("/list/delete",checkSignIn(),brandOriginCtr.remove_list_brandOrigin);


module.exports = router;