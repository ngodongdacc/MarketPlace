const express = require('express');
const router = express.Router();
const originCtr = require("../Controllers/customs_product/origin_controller");
const {checkSignIn} = require("../middleware/auth");

router.post('/add',checkSignIn(), originCtr.create_origin);
router.post('/sua/:id',checkSignIn(), originCtr.update_origin);
router.post('/xoa/:id',checkSignIn(), originCtr.remove_origin);
router.get('/lay',checkSignIn(), originCtr.getProfile);
router.get('/get/:id',checkSignIn(), originCtr.get_origin);
router.get('/search',checkSignIn(), originCtr.search_origin);
router.get("/list",checkSignIn(),originCtr.get_list_origin);
router.post("/list/delete",checkSignIn(),originCtr.remove_list_origin);



module.exports = router;