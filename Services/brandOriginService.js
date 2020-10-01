var BrandOrigin = require("../Model/brandOrigin");
module.exports = {
  findOneBrandOriginByID: async (id, cb) => {
    try {
      BrandOrigin.findById(id, cb);
    } catch (e) {
      throw e
    }
  },
  removeBrandOriginkById: async (id, cb) => {
    try {
      BrandOrigin.findByIdAndRemove(id, cb);
    } catch (e) {
      throw e
    }
  },
  createBrandOrigin: async (brandOrigin, cb) => {
    try {
      BrandOrigin.create(brandOrigin, cb);
    } catch (e) {
      throw e
    }
  },
  updateBrandOrigin: async (brandOrigin, cb) => {
    try {
      BrandOrigin.updateOne(brandOrigin, cb);
    } catch (e) {
      throw e
    }
  },
  deleteBrandOrigin: async (brandOrigin, cb) => {
    try {
      BrandOrigin.deleteOne(brandOrigin, cb);

    } catch (e) {
      throw e
    }
  },
  findCountry: async (Country, cb) => {
    try {
      console.log(Country);
      BrandOrigin.findOne({ Country: Country }, cb);
    } catch (e) {
      throw e
    }
  }
}