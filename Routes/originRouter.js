const express = require('express');
const router = express.Router();
const originCtr = require("../Controllers/originController");

router.post('/add', originCtr.postcreateOrigin);
router.post('/sua/:id', originCtr.postupdateOrigin);
router.post('/xoa/:id', originCtr.postdeleteOrigin);
router.get('/lay', originCtr.getProfile);



module.exports = router;