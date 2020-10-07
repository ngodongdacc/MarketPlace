const express = require("express");
const router = express.Router();
const bookCtr = require("../Controllers/book_controller");

router.get("/add/:id",bookCtr.add_book); // thêm mới book

module.exports = router;