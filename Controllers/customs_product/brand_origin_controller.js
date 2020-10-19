const BrandOrigin = require("../../Model/brandOrigin");
const BrandOriginService = require("../../Services/brandOriginService");
const async = require("async");
// validator
const { error_400, error_500, success } = require("../validator/errors");

module.exports = {
    create_brandOrigin: async (req, res, next) => {
        try {
            const { Country } = req.body
            const brandOrigin = req.body
            if (!Country)
                return error_400 (res,"hãy điền tên quốc gia"); // kiểm tra quốc gia
                 
            async.parallel([
                (cb) => {// kiểm tra quốc gia
                    if (Country)
                        BrandOriginService.findCountry(Country, (err, resCountryOrigin) => {
                            if (err) cb(err)
                            else if (!resCountryOrigin) cb(null, true);
                            else cb(null, false);
                        })
                    else cb(null, true)
                },

            ], (err, results) => {
                if (err) return error_500(res,err);
                if (!results[0]) return error_400(res, "Tết quốc gia đã tồn tại");

                BrandOrigin.create(brandOrigin, (err, resbrandOrigin) => {
                    if (err) return error_500(res, err);
                    success(res, "Tạo một xuất xứ thương hiệu  thành công", resbrandOrigin)
                })

            });

        } catch (error) {
         error_500(res,error);
        }
    },
    // chỉnh sửa xuất xứ thương hiệu theo id
    update_brandOrigin: async (req, res, next) => {
        try {
            const { Country } = req.body
            const brandOrigin = req.body
            const id = req.params.id
            if (!Country)
                return error_400 (res,"hãy điền tên quốc gia"); // kiểm tra quốc gia
                 
            async.parallel([
                (cb) => {// kiểm tra quốc gia
                    if (Country)
                        BrandOriginService.findCountry(Country, (err, resCountryOrigin) => {
                            if (err) cb(err)
                            else if (!resCountryOrigin) cb(null, true);
                            else cb(null, false);
                        })
                    else cb(null, true)
                },

            ], (err, results) => {
                if (err) return error_500(res,err);
                if (!results[0]) return error_400(res, "Tết quốc gia đã tồn tại");
                BrandOrigin.findById(id, (err, resbrandOrigin) => {
                    if (err) return error_500(res, err);
                    if (!resbrandOrigin) return error_400(res, "Không tìm thấy id Xuất xứ thương hiệu " + id, "id");
        
                    BrandOrigin.findByIdAndUpdate(resbrandOrigin._id, brandOrigin, { new: true })
                        .exec((err, resUpdate) => {
                            if (err) return error_500(res, err);
                            success(res, "Cập nhật xuất xứ thương hiệu thành công", resUpdate)
                        })
                })

            });

        } catch (error) {
            error_500(res,error);
        }
    },
    // Lấy chi tiết xuất xứ thương hiệu bằng id
    get_brandOrigin: (req, res) => {
        const id = req.params.id
        if (!id) return error_400("Vui lòng nhập Id", "id");

        BrandOrigin.findById(id, (err, resbrandOrigin) => {
            if (err) return (res, err);
            if (!resbrandOrigin) return error_400("Không tìm thấy id Xuất xứ thương hiệu " + id, "id");

            success(res, "Lấy chi tiết xuất xứ thương hiệu thành công", resbrandOrigin);
        })
    },
    // Xóa xuất xứ thương hiệu bằng id
    remove_brandOrigin: (req, res) => {
        const id = req.params.id
        if (!id) return error_400("Vui lòng nhập Id", "id");

        BrandOrigin.findById(id, (err, resbrandOrigin) => {
            if (err) return error_500(res, err);
            if (!resbrandOrigin) return error_400(res, "Không tìm thấy id xuất xứ thương hiệu" + id, "id");

            BrandOrigin.findByIdAndRemove(resbrandOrigin._id, (err, resRemove) => {
                if (err) return error_500(res, err);

                success(res, "Xoá xuất xứ thành công", resRemove)
            })

        })

    },
    //Lấy danh sách xuất xứ thương hiệu
    get_list_brandOrigin: (req, res) => {
        const config = {};

        config.page = req.query.page ? Number(req.query.page) : 1
        config.limit = req.query.limit ? Number(req.query.limit) : 20
        config.skip = (config.page - 1) * config.limit;

        async.parallel([
            (cb) => BrandOrigin
                .find({})
                .skip(config.skip)
                .limit(config.limit)
                .sort({ Date: "desc" })
                .exec((e, data) => e ? cb(e) : cb(null, data)),
            (cb) => BrandOrigin.count().exec((e, data) => e ? cb(e) : cb(null, data))
        ], (err, results) => {
            if (err) return error_500(res, err);
            success(res, "Lấy danh sách xuất xứ thương hiệu thành công",
                {
                    unit: results[0],
                    count: results[1],

                })

        })
    },
    // xóa danh sách xuất xứ
    remove_list_brandOrigin: (req, res) => {
        const listIdBrandOrigin = req.body.ListId;
        if (!listIdBrandOrigin || (Array.isArray(listIdBrandOrigin) && listIdBrandOrigin.length === 0))
            return error_400(res, "Vui lòng chọn xuất xứ thương hiệu cần xóa", "ListId");
        if (!Array.isArray(listIdBrandOrigin)) return error_400(res, "ListId phải là array", "ListId");

        BrandOrigin
            .deleteMany({ _id: { $in: listIdBrandOrigin } })
            .exec((err, resData) => {
                if (err) return error_500(res, err);
                success(res, `Xóa thành công ${resData.n} xuất xứ thương hiệu `, resData)
            })

    },
    //Tìm kiếm theo tến
    search_brandOrigin: (req, res) => {
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
                    BrandOrigin.find(query)
                        .skip()
                        .limit(config.limit)
                        .sort({ Date: "desc" })
                        .exec((e, data) => e ? cb(e) : cb(null, data)),
                (cb) => BrandOrigin.count(query)
                    .exec((e, data) => e ? cb(e) : cb(null, data))
            ], (err, results) => {
                if (err) return error_500(res, err);
                success(res, "Lấy danh sách xuất xứ thương hiệu thành công",
                    {

                        unit: results[0],
                        count: results[1],

                    })

            })

        } catch (error) {
           error_500(res,error);
        }
    },
    // lấy tất cả xuất xứ
    getProfile: async (req, res) => {
        try {
            const brandOrigin = await BrandOrigin.find()
            res.json(brandOrigin)
        } catch (err) {
            res.send('Error ' + err)
        }
    },

}