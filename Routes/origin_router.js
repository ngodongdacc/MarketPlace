const express = require('express');
const router = express.Router();
const originCtr = require("../Controllers/customs_product/origin_controller");
const {checkSignIn} = require("../middleware/auth");

router.post('/add', originCtr.create_origin);
router.post('/update/:id', originCtr.update_origin);
router.post('/datele/:id',originCtr.remove_origin);
router.get('/get', originCtr.getProfile);
router.get('/get/:id', originCtr.get_origin);
router.get('/search',originCtr.search_origin);
router.get("/list",originCtr.get_list_origin);
router.post("/list/delete",originCtr.remove_list_origin);



module.exports = router;