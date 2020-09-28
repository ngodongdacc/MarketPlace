var Comment = require("../Model/comment");
const bcrypt = require("bcryptjs");



module.exports = {
 get_List_Comment_AllPost :  async (cart, cb) => {
    try {
        Comment.find({}, cb)
    } catch (e) {
      throw e
    }
  }

}