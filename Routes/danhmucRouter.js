var express = require('express');
var router = express.Router();

var danhMucCtr = require("../Controllers/DanhmucController");

router.post('/add', danhMucCtr.postDanhMUc);
router.post('/sua', danhMucCtr.postDanhMUc);
router.post('/xoa', danhMucCtr.postDanhMUc);
router.get('/lay', danhMucCtr.postDanhMUc);

module.exports = router