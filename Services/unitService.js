var Units = require("../Model/unit");
module.exports = {
  findUnit: async (search, cb) => {
    try {
      Units.findOne({ Name: search }, cb)
    } catch (e) {
      throw e
    }
  },


}