var Notification = require("../Model/notification");
const bcrypt = require("bcryptjs");
const moment = require('moment');
const mongoose = require("mongoose");
module.exports = {
  // formatMessage: async (data, cb) => {
  //   return {
  //     Content:data.Content,
  //     URL:data.URL,
  //     IdUser:data.IdUser,
  //     Status: data.Status
  //     // time: moment().format('HH:mm:ss DD-MM-YYYY ')
  //   };
  // },
  createNotification: async (data, cb) => {
    data.Status = false;
    try {
      Notification.create(data, cb);
    } catch (e) {
      throw e
    }
  },
  updateNotification: async (id, data, cb) => {
    data.Status = true;
    try {
      Notification.findByIdAndUpdate(id, data, { new: true }, cb);
    } catch (e) {
      throw e
    }
  },
  getListNotitification: async (data, cb) => {
    try {
      Notification.find({}, cb)
    } catch (e) {
      throw e
    }
  },
  findByIdNotification: async (IdUser, cb) => {
    const query = {
      IdUser: new mongoose.mongo.ObjectId(IdUser)
  }
    try {
      Notification.find(query)
        .sort({ NewDateAt: 'asc' })
        .exec(cb)
    } catch (e) {
      throw e
    }
  },
  DeleteByIdNotification: async (id, cb) => {
    try {
      Notification.deleteOne({_id:id},cb);
    } catch (e) {
      throw e
    }
  }
}