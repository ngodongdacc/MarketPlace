var Origin = require("../Model/origin");
module.exports = {
  findOneOriginByID: async (id, cb) => {
    try {
      Origin.findById(id, cb);
    } catch (e) {
      throw e
    }
  },
  removeOriginkById: async (id, cb) => {
    try {
      Origin.findByIdAndRemove(id, cb);
    } catch (e) {
      throw e
    }
  },
  createOrigin: async (origin, cb) => {
    try {
      Origin.create(origin, cb);
    } catch (e) {
      throw e
    }
  },
  updateOrigin: async (origin, cb) => {
    try {
      Origin.updateOne(origin, cb);
    } catch (e) {
      throw e
    }
  },
  deleteOrigin: async (origin, cb) => {
    try {
      Origin.deleteOne(origin, cb);

    } catch (e) {
      throw e
    }
  },
  findCountry: async (Country, cb) => {
    try {
      console.log(Country);
      Origin.findOne({ Country: Country }, cb);
    } catch (e) {
      throw e
    }
  }

}