var Cart = require("../Model/cart");
const bcrypt = require("bcryptjs");

const createCart = async (userId,listproduct, cb) => {
  try {
     Cart.create({userId,listproduct}, cb);
  } catch (e) {
    throw e
  }
}
const updateListCart = async (userId, cb) => {
  try {
     Cart.findById(userId, cb);
  } catch (e) {
    throw e
  }
}

const updateCart = async (cart, cb) => {
  try {
    Cart.updateOne(cart, cb);
  } catch (e) {
    throw e
  }
}
const deleteCart = async (cart, cb) => {
  try {
    Cart.deleteOne({ _id: cart.id }, cb);
  } catch (e) {
    throw e
  }
}
const getCart = async (cart, cb) => {
  try {
    Cart.find({}, cb)
  } catch (e) {
    throw e
  }
}


//  search category

const findCart = async (search, cb) => {
  try {
    Cart.findOne({ cartId: search }, cb)
  } catch (e) {
    throw e
  }
}

const findCartUserId = async (search, cb) => {
  try {
    Cart.findOne({ userId: search }, cb)
  } catch (e) {
    throw e
  }
}
const getCartById = async (id,cb) => {
  try {         
     Cart.findById(id,cb);
  } catch(e) {
    throw e
  }
}

module.exports = {
  createCart, updateCart, deleteCart, getCart, findCart,findCartUserId, getCartById,updateListCart

}