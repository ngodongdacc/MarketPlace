var Shop = require("../Model/shop");
const bcrypt = require("bcryptjs");

const createShop = async (shop, cb) => {
  try {
    Shop.create(shop, cb);
  } catch (e) {
    throw e
  }
}

const updateShop = async (shop, cb) => {
  try {
    Shop.updateOne(shop, cb);
  } catch (e) {
    throw e
  }
}
const deleteShop = async (shop, cb) => {
  try {
    Shop.deleteOne(shop, cb);
  } catch (e) {
    throw e
  }
}
const getShop = async (shop, cb) => {
  try {
    Shop.find({}, cb)
  } catch (e) {
    throw e
  }
}


//  search category

const findShop = async (search, cb) => {
  try {
    Shop.findOne({ shopName: search }, cb)
  } catch (e) {
    throw e
  }
}
module.exports = {
  createShop, updateShop, deleteShop, getShop, findShop

}