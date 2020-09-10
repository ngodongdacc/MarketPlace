var Shop = require("../Model/shop");

const createShop = async (shop,cb) => {
    try {    
        Shop.create(shop, cb);
    } catch(e) {
      throw e
    }
  }

const updateShop = async (shop,cb) => {
    try {         
        Shop.updateOne(shop, cb);
    } catch(e) {
      throw e
    }
  }
const deleteShop = async (shop,cb) => {
    try {         
        Shop.deleteOne(shop, cb);
    } catch(e) {
      throw e
    }
  }

module.exports = {
    createShop
}