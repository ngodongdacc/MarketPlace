var Shop = require("../Model/shop");
const bcrypt = require("bcryptjs");
module.exports = {
  findOneOwnerShop : async (name, cb) => {
    try {
      Shop.findOne({ ShopName: name }, cb);
    } catch (e) {
      throw e
    }
  }
  ,
  createShop : async (shop, cb) => {
    try {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(shop.PasswordShop, salt, async function (err, hash) {
          if (err) {
            cb(err, null)
          }
          shop.PasswordShop = hash;
          Shop.create(shop, cb);
        });
      });
    } catch (e) {
      throw e
    }
  }

  , updateShop : async (id, shop, cb) => {
    try {
      Shop.updateOne({ _id: id }, shop, cb);
    } catch (e) {
      throw e
    }
  }
  , deleteShop : async (id, cb) => {
    try {
      Shop.deleteOne({ _id: id }, cb);
    } catch (e) {
      throw e
    }
  }
  , getShop : async (shop, cb) => {
    try {
      Shop.find({}, cb)
    } catch (e) {
      throw e
    }
  }


  //  search category

  , findShop : async (search, cb) => {
    try {
      Shop.findOne({ ShopName: search }, cb)
    } catch (e) {
      throw e
    }
  }

  , findEmail: async (Email, cb) => {
    try {
      console.log(Email);
      Shop.findOne({ EmailOwner: Email }, cb);
    } catch (e) {
      throw e
    }
  }

  , findPhone: async (Phone, cb) => {
    try {
      Shop.findOne({ Phone: Phone }, cb);
    } catch (e) {
      throw e
    }
  }
  , findBusinessRegisCode: async (businessRegisCode, cb) => {
    try {
      Shop.findOne({ BusinessRegisCode: businessRegisCode }, cb);
    } catch (e) {
      throw e
    }
  }
  , countOwnerShop: async (cb) => {
    Shop.count({}, cb);
  }

  , findOneUserByID : async (id, cb) => {
    try {
      Shop.findById({ _id: id }, cb);
    } catch (e) {
      throw e
    }
  },
  comparePassword : async (myPassword,hash,cb) => {
    try {         
      bcrypt.compare(myPassword,hash,(err,isMath) => {
        if(err) throw err
        cb(null, isMath)
      })
    } catch(e) {
      throw e
    }
  }

}