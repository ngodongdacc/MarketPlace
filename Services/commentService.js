var Comment = require("../Model/comment");
const bcrypt = require("bcryptjs");
const Users = require("../Model/users");
const async = require("async");
const { mongo, Mongoose } = require("mongoose");
const mongoose = require("mongoose");

module.exports = {
  get_List_Comment_AllPost: async (cart, cb) => {
    try {
      Comment.find({}, cb)
    } catch (e) {
      throw e
    }
  },
  listComments: async (IdProduct, cb) => {
    const query = {
      IdProduct: new mongoose.mongo.ObjectId(IdProduct)
    }
    try {
      async.parallel([
        (cb) =>
          Comment.aggregate([
            { $match: query },
            {
              $lookup: // user
              {
                from: "users",
                localField: "IdUser",
                foreignField: "_id",
                as: "UserName",
              },
            }])
            // .skip(config.skip)
            // .limit(config.limit)
            .sort({ NewDateAt: "desc" })
            .exec((e, resData) => e ? cb(e) : cb(null, resData)),

        (cb) => Comment.countDocuments(query)
          .exec((e, count) => e ? cb(e) : cb(null, count))

      ], (err, results) => {
        if (err) return error_500(res, err);
        async.waterfall([
          cb => {
            results[0] = results[0].map(el => {
              if (el.UserName && el.UserName[0]
                && el.UserName[0].FullName)
                el.UserName = el.UserName[0].FullName

              else el.UserName = "Khách hàng";
              return el
            })
            cb(null, results)
          }
        ]
        , (e, results) => {
          if (e) error_500(res, e)
          cb(null, results)
          // success(res, "Lấy danh sách bình luận thành công",
          //   {
          //     comment: results[0],
          //     count: results[1],
          //   })
        }
        )
      })
    } catch (e) {
      throw e
    }
  }

}