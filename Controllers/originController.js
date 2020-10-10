const Origin = require("../Model/origin");
const OriginService = require("../Services/originService");
const async = require("async");
// validator
const { error_400, error_500, success } = require("../validator/errors");


module.exports = {
    create_origin: async (req, res, next) => {
        try {
            const { Country } = req.body
            const origin = req.body
            if (!Country)
                return error_400(res, "hãy điền tên quốc gia"); // kiểm tra quốc gia


            async.parallel([
                (cb) => {// kiểm tra quốc gia
                    if (Country)
                        OriginService.findCountry(Country, (err, resCountryOrigin) => {
                            if (err) cb(err)
                            else if (!resCountryOrigin) cb(null, true);
                            else cb(null, false);
                        })
                    else cb(null, true)
                },

            ], (err, results) => {
                if (err) return error_500(res, err);
                if (!results[0]) return error_400(res, "Tết quốc gia đã tồn tại");

                Origin.create(origin, (err, resorigin) => {
                    if (err) return error_500(res, err);
                    success(res, "Tạo một xuất xứ thành công", resorigin)
                })

            });

        } catch (error) {
            error_500(res, error);
        }
    },
    // chỉnh sửa xuất xứ thương hiệu theo id
    update_origin: async (req, res, next) => {
        try {
            const { Country } = req.body
            const origin = req.body
            const id = req.params.id
            if (!Country)
                return error_400(res, "hãy điền tên quốc gia"); // kiểm tra quốc gia

            async.parallel([
                (cb) => {// kiểm tra quốc gia
                    if (Country)
                        OriginService.findCountry(Country, (err, resCountryOrigin) => {
                            if (err) cb(err)
                            else if (!resCountryOrigin) cb(null, true);
                            else cb(null, false);
                        })
                    else cb(null, true)
                },

            ], (err, results) => {
                if (err) return error_500(res, err);
                if (!results[0]) return error_400(res, "Tết quốc gia đã tồn tại");
                Origin.findById(id, (err, resorigin) => {
                    if (err) return error_500(res, err);
                    if (!resorigin) return error_400(res, "Không tìm thấy id Xuất xứ " + id, "id");

                    Origin.findByIdAndUpdate(resorigin._id, origin, { new: true })
                        .exec((err, resUpdate) => {
                            if (err) return error_500(res, err);
                            success(res, "Cập nhật xuất xứ thành công", resUpdate)
                        })
                })

            });

        } catch (error) {
            error_500(res, error);
        }
    },
    // Lấy chi tiết xuất xứ thương hiệu bằng id
    get_origin: (req, res) => {
        const id = req.params.id
        if (!id) return error_400("Vui lòng nhập Id", "id");

        Origin.findById(id, (err, resorigin) => {
            if (err) return (res, err);
            if (!resorigin) return error_400(res, "Không tìm thấy id Xuất xứ" + id, "id");

            success(res, "Lấy chi tiết xuất xứ thành công", resorigin);
        })

    },
    // Xóa xuất xứ thương hiệu bằng id
    remove_origin: (req, res) => {
        const id = req.params.id
        if (!id) return error_400("Vui lòng nhập Id", "id");

        Origin.findById(id, (err, resorigin) => {
            if (err) return error_500(res, err);
            if (!resorigin) return error_400(res, "Không tìm thấy id xuất xứ " + id, "id");

            Origin.findByIdAndRemove(resorigin._id, (err, resRemove) => {
                if (err) return error_500(res, err);

                success(res, "Xoá xuất xứ thành công", resRemove)
            })

        })

    },
    //Lấy danh sách xuất xứ thương hiệu
    get_list_origin: (req, res) => {
        const config = {};

        config.page = req.query.page ? Number(req.query.page) : 1
        config.limit = req.query.limit ? Number(req.query.limit) : 20
        config.skip = (config.page - 1) * config.limit;

        async.parallel([
            (cb) => Origin
                .find({})
                .skip(config.skip)
                .limit(config.limit)
                .sort({ Date: "desc" })
                .exec((e, data) => e ? cb(e) : cb(null, data)),
            (cb) => Origin.count().exec((e, data) => e ? cb(e) : cb(null, data))
        ], (err, results) => {
            if (err) return error_500(res, err);
            success(res, "Lấy danh sách xuất xứ thành công",
                {
                    unit: results[0],
                    count: results[1],

                })

        })
    },
    // xóa danh sách xuất xứ
    remove_list_origin: (req, res) => {
        const listIdOrigin = req.body.ListId;
        if (!listIdOrigin || (Array.isArray(listIdOrigin) && listIdOrigin.length === 0))
            return error_400(res, "Vui lòng chọn xuất xứ cần xóa", "ListId");
        if (!Array.isArray(listIdOrigin)) return error_400(res, "ListId phải là array", "ListId");

        Origin
            .deleteMany({ _id: { $in: listIdOrigin } })
            .exec((err, resData) => {
                if (err) return error_500(res, err);
                success(res, `Xóa thành công ${resData.n} xuất xứ `, resData)
            })

    },
    //Tìm kiếm theo tến
    search_origin: (req, res) => {
        try {


            const config = {};
            config.search = req.query.search
            config.Country = req.query.Country
            config.page = req.query.page ? Number(req.query.page) : 1
            config.limit = req.query.limit ? Number(req.query.limit) : 20
            config.skip = (config.page - 1) * config.limit;


            const query = { Country: { $regex: config.Country, $options: "i" } }
            async.parallel([
                (cb) =>
                    Origin.find(query)
                        .skip()
                        .limit(config.limit)
                        .sort({ Date: "desc" })
                        .exec((e, data) => e ? cb(e) : cb(null, data)),
                (cb) => Origin.count(query)
                    .exec((e, data) => e ? cb(e) : cb(null, data))
            ], (err, results) => {
                if (err) return error_500(res, err);
                success(res, "Lấy danh sách xuất xứ thành công",
                    {

                        unit: results[0],
                        count: results[1],

                    })

            })

        } catch (error) {
            error_500(res, error);
        }
    },
    // lấy tất cả xuất xứ
    getProfile: async (req, res) => {
        try {
            const origin = await Origin.find()
            res.json(origin)
        } catch (err) {
            res.send('Error ' + err)
        }
    },

}