const express = require('express');
const router = express.Router();
const trademarkCtr = require("../Controllers/customs_product/trademark_controller");

router.post('/add', trademarkCtr.postcreateTrademark);
router.post('/sua/:id', trademarkCtr.postupdateTrademark);
router.post('/xoa/:id', trademarkCtr.postdeleteTrademark);
router.get('/lay', trademarkCtr.getProfile);



module.exports = router;