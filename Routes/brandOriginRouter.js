const express = require('express');
const router = express.Router();
const brandOriginCtr = require("../Controllers/brandOriginController");

router.post('/add', brandOriginCtr.postcreateBrandOrigin);
router.post('/sua/:id', brandOriginCtr.postupdateBrandOrigin);
router.post('/xoa/:id', brandOriginCtr.postdeleteBrandOrigin);
router.get('/lay', brandOriginCtr.getProfile);



module.exports = router;