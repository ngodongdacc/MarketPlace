const KeySearch = require("../../Model/keySearch");
const async = require("async");
const { error_400, success, error_500 } = require("../../validator/errors");

module.exports = {

    // Lấy từ khóa được tìm kiếm nhiều nhất 
    count_search: (req, res) => {

        let limit = req.query.limit ? Number(req.query.limit) : 10;
        let page = req.query.page ? Number(req.query.page) : 1;
        let skip = (page - 1) * limit;

        async.parallel([
            (cb) => {
                KeySearch
                    .find()
                    .sort({ "CountSearch": -1 })
                    .limit(limit)
                    .skip(skip)
                    .select("Key CountSearch")
                    .exec((e, k) => e ? cb(e) : cb(null, k))
            },
            (cb) => {
                KeySearch
                    .count()
                    .exec((e, c) => e ? cb(e) : cb(null, c))
            }

        ], (e, results) => {
            if (e) return error_500(res, e);

            success(res, "Lấy từ khóa tìm kiếm thành công",
                { KeySearch: results[0], count: results[1] })
        })
    },

    // Lấy các từ khóa của user đã tìm kiếm
    count_search_user: (req, res) => {

        let limit = req.query.limit ? Number(req.query.limit) : 10;
        let page = req.query.page ? Number(req.query.page) : 1;
        let skip = (page - 1) * limit;

        async.parallel([
            (cb) => {
                KeySearch
                    .find({ "ListIdUser.IdUser": req.user._id })
                    .limit(limit)
                    .skip(skip)
                    .sort({ "ListIdUser.Counts": -1 })
                    .select("Key CountSearch ListIdUser")
                    .exec((e, k) => e ? cb(e) : cb(null, k))
            },
            (cb) => {
                KeySearch
                    .count({ "ListIdUser.IdUser": req.user._id })
                    .exec((e, c) => e ? cb(e) : cb(null, c))
            }

        ], (e, results) => {
            if (e) return error_500(res, e);

            success(res, "Lấy từ khóa tìm kiếm của user thành công",
                { KeySearch: results[0], count: results[1] })
        })
    }
}