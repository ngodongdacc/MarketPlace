var Notification = require("../Model/notification");
const bcrypt = require("bcryptjs");
var socket = io("http://192.168.43.64:3000");
module.exports = {
  createNotification : async (name, cb) => {
    try {
        Notification.findOne({ ShopName: name }, cb);
    } catch (e) {
      throw e
    }
  }
 

}