var Units = require("../Model/unit");
module.exports = {
  findUnit: async (search, cb) => {
    try {
      Units.findOne({ Name: search }, cb)
    } catch (e) {
      throw e
    }
  },
  findName: async (Name, cb) => {
    try {
      console.log(Name);
      Units.findOne({ Name: Name }, cb);
    } catch (e) {
      throw e
    }
  }


}