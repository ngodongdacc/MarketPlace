const express = require("express");
const router = express.Router();
const productCtr = require("../Controllers/productController")

router.post("/",productCtr.create_product);
router.post("/update/:id",productCtr.update_product);
router.get("",productCtr.get_product);
router.post("/delete/:id",productCtr.remove_product);
router.get("/list",productCtr.get_list_product);
router.post("/list/delete",productCtr.remove_list_product);
router.get("/search",productCtr.search_product);

module.exports = router