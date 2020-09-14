var Shop = require("../Model/shop");
const bcrypt = require("bcryptjs");

const findOneOwnerShop = async (name,cb) => {
  try {         
    Shop.findOne({shopName: name},cb);
  } catch(e) {
    throw e
  }
}

const createShop = async (shop,cb) => {
  try {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(shop.passwordShop, salt,async function(err, hash) {
            if (err){
              cb(err,null)
            } 
            shop.passwordShop = hash;
              Shop.create(shop,cb);
          });
        });    
     } catch(e) {
    throw e
  }
}

const updateShop = async (id,shop, cb) => {
  try {
    Shop.updateOne({_id:id},shop, cb);
  } catch (e) {
    throw e
  }
}
const deleteShop = async (shop, cb) => {
  try {
    Shop.deleteOne({ _id: shop.id }, cb);
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

const findEmail= async (Email,cb) => {
  try {         
    console.log(Email);
    Shop.findOne({emailOwner: Email},cb);
  } catch(e) {
    throw e
  }
}

const findPhone= async (Phone,cb) => {
  try {         
    Shop.findOne({phone: Phone},cb);
  } catch(e) {
    throw e
  }
}
const findBusinessRegisCode= async (businessRegisCode,cb) => {
  try {         
    Shop.findOne({businessRegisCode: businessRegisCode},cb);
  } catch(e) {
    throw e
  }
}

module.exports = {
  createShop, updateShop, deleteShop, getShop, findShop,findOneOwnerShop,findEmail,findPhone,findBusinessRegisCode,
  findOneUserByID : async (id,cb) => {
    try {         
      Shop.findById({_id:id},cb);
    } catch(e) {
      throw e
    }
  }


}