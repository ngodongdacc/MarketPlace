const express = require('express');
const router = express.Router();
const TagRouter = require("../Controllers/tagController")

router.post("/", TagRouter.addTag);

router.post("/delete", TagRouter.deleteTag)

module.exports = router