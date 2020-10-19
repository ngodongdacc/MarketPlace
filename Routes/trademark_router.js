const express = require('express');
const router = express.Router();
const trademarkCtr = require("../Controllers/customs_product/trademark_controller");

router.post('/add', trademarkCtr.create_trademark);
router.post('/update/:id', trademarkCtr.update_trademark);
router.post('/delete/:id', trademarkCtr.remove_trademark);
router.get('/get', trademarkCtr.get_trademarks);
router.get('/get/:id',trademarkCtr.get_trademark);
router.get("/list",trademarkCtr.get_list_trademark);
router.post("/list/delete",trademarkCtr.remove_list_trademark);
router.get('/search', trademarkCtr.search_trademark);


module.exports = router;