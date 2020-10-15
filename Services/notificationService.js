var Notification = require("../Model/notification");
const bcrypt = require("bcryptjs");
const moment = require('moment');

module.exports = {
  formatMessage: async (username, text, cb) => {
    return {
      username,
      text,
      time: moment().format('HH:mm:ss DD-MM-YYYY ')
    };
  },
  createNotification: async (name, cb) => {
    var data = {};
    data.formatMessage();
    try {
      // Notification.create()
    } catch (e) {
      throw e
    }
  },
  getListNotitification : async (data, cb) => {
    try {
      Notification.find({}, cb)
    } catch (e) {
      throw e
    }
  }


}