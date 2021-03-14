const express = require("express");
const router = express.Router();

const upload = require('../helper/multer');
const { createdDir } = require('../../api/helper/dir');
// controller
const faceCtr = require('./face.controller');

router.post('/async-images', upload.any('uploadedImages'), faceCtr.uploadImages);

module.exports = router;