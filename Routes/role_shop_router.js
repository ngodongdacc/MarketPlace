const express = require('express');
const router = express.Router();

const {checkLogInShop, checkRoleShop} = require("../middleware/auth")
const roleShopCtr = require("../Controllers/shops/role_shop_controller");

router.post("/", roleShopCtr.create_role_shop);
router.get("/search",checkLogInShop(),checkRoleShop(10093),roleShopCtr.search);
router.post("/add",checkLogInShop(),roleShopCtr.add_role_shop);

module.exports = router;