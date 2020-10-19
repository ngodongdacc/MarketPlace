const express = require("express");
const router = express.Router();
const multer = require("multer");
// const upload = multer({dest: "Public/images/"})

// controller
const productCtr = require("../Controllers/products/product_controller");

const {checkLogInShop} = require("../middleware/auth");

// Begin import img
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Public/images/products')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now().toString()+ '-' +file.originalname)
    }
  })
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });
// end import img
  

// router.post("/",upload.single("Image"),productCtr.create_product);
router.post("/",productCtr.create_product);
router.post("/update/:id",productCtr.update_product);
router.get("",productCtr.get_product);
router.post("/delete/:id",productCtr.remove_product);
router.get("/list",productCtr.get_list_product);
router.post("/list/delete",productCtr.remove_list_product);
router.get("/search",productCtr.search_product);
router.get("/category/search",productCtr.search_category);
router.get("/search/query",productCtr.search);
router.get('/shop/search',checkLogInShop(),productCtr.search_product_shop); // tìm kiếm sản phẩm của shop
module.exports = router
