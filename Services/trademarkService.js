var Trademark = require("../Model/trademark");
module.exports = {
  findOneTrademarkByID: async (id, cb) => {
    try {
      Trademark.findById(id, cb);
    } catch (e) {
      throw e
    }
  },
  removeTrademarkById: async (id, cb) => {
    try {
      Trademark.findByIdAndRemove(id, cb);
    } catch (e) {
      throw e
    }
  },
  createTrademark: async (trademark, cb) => {
    try {
      Trademark.create(trademark, cb);
    } catch (e) {
      throw e
    }
  },
  updateTrademark: async (trademark, cb) => {
    try {
      Trademark.updateOne(trademark, cb);
    } catch (e) {
      throw e
    }
  },
  deleteTrademark: async (trademark, cb) => {
    try {
      Trademark.deleteOne(trademark, cb);

    } catch (e) {
      throw e
    }
  }

}