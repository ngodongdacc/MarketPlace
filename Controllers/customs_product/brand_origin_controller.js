const BrandOrigin = require("../../Model/brandOrigin");
const BrandOriginService = require("../../Services/brandOriginService");
const async = require("async");

module.exports = {
    create_brandOrigin: async (req, res, next) => {
        try {
            const { Country } = req.body
            if (!Country)
                return res.status(400) // kiểm tra Country
                    .json({
                        message: "Please enter your Country",
                        status: false,
                        code: 0
                    })

            const brandOrigin = req.body
            async.parallel([
                (cb) => {// kiểm tra Country
                    if (Country)
                        BrandOriginService.findCountry(Country, (err, resCountryOrigin) => {
                            if (err) cb(err)
                            else if (!resCountryOrigin) cb(null, true);
                            else cb(null, false);
                        })
                    else cb(null, true)
                },

            ], (err, results) => {
                if (err) return res.status(400).json({ message: "There was an error processing", errors: err });
                if (!results[0]) return res.status(400).json({ message: "Tết country đã tồn tại", status: false, code: 0 });

                BrandOrigin.create(brandOrigin, (err, resbrandOrigin) => {
                    if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                    res.json({
                        message: "Tạo một brandOrigin thành công",
                        data: resbrandOrigin,
                        status: true
                    })
                })

            });

        } catch (e) {
            res.send({
                message: e.message,
                errors: e.errors,
                code: 0
            }).status(500) && next(e)
        }
    },
    // chỉnh sửa đơn vị tính theo id
    update_brandOrigin: (req, res) => {
        const brandOrigin = req.body
        const id = req.params.id
        if (!id) return res.status(400).json({ message: "Vui lòng nhập Id brandOrigin", status: false });
        if (!brandOrigin.Country === "") return res.status(400).json({ message: "Country không được rỗng", status: false });
        console.log("brandOrigin:: ", req.body);
        BrandOrigin.findById(id, (err, resbrandOrigin) => {
            if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
            if (!resbrandOrigin) return res.json({ message: "Không tìm thấy id Xuất xứ", data: null, status: false });

            BrandOrigin.findByIdAndUpdate(resbrandOrigin._id, { $set: brandOrigin }, {}, (err, resUpdate) => {
                if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                res.json({
                    message: "Cập nhật một brandOrigin thành công",
                    data: resUpdate,
                    status: true
                })
            })
        })
    },
    // Lấy chi tiết đơn vị tính  bằng id
    get_brandOrigin: (req, res) => {
        const id = req.params.id
        if (!id) return res.status(400).json({ message: "Vui lòng nhập Id", status: false });

        BrandOrigin.findById(id, (err, resbrandOrigin) => {
            if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
            if (!resbrandOrigin) return res.status(400).json({ message: "Không tìm thấy Xuất xứ", data: null, status: false });

            res.json({
                message: "Lấy chi tiết xuất xứ thành công",
                data: resbrandOrigin,
                status: true
            })
        })
    },
    // Xóa đớn vị tính bằng id
    remove_brandOrigin: (req, res) => {
        const id = req.params.id
        if (!id) return res.status(400).json({ message: "Vui lòng nhập Id", status: false });

        BrandOrigin.findById(id, (err, resbrandOrigin) => {
            if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
            if (!resbrandOrigin) return res.status(400).json({ message: "Không tìm thấy xuất xứ", data: null, status: false });

            BrandOrigin.findByIdAndRemove(resbrandOrigin._id, (err, resRemove) => {
                if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                res.json({
                    message: "Xóa một xuất xứ thành công",
                    data: resRemove,
                    status: true
                })
            })

        })

    },
    //Lấy danh sách xuất xứ
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
            if (err) if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
            res.json({
                message: "Lấy danh sách xuất xứ thành công",
                data: {
                    brandOrigin: results[0],
                    count: results[1],
                },
                status: true
            })
        })
    },
    // xóa danh sách xuất xứ
    remove_list_brandOrigin: (req, res) => {
        const listIdBrandOrigin = req.body.ListId;
        if (!listIdBrandOrigin || (Array.isArray(listIdBrandOrigin) && listIdBrandOrigin.length === 0)) return res.status(400).json({ message: "Vui lòng chọn sản phẩm cần xóa", status: false });
        if (!Array.isArray(listIdBrandOrigin)) return res.status(400).json({ message: "ListId phải là array", status: false });

        BrandOrigin
            .deleteMany({ _id: { $in: listIdBrandOrigin } })
            .exec((err, resData) => {
                if (err) if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                res.send({
                    message: `Xóa thành công ${resData.n} sản phẩm`,
                    data: resData,
                    status: true
                })
            })

    },
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
                if (err) if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                res.json({
                    message: "Lấy danh sách Xuất xứ  thành công",
                    data: {
                        brandOrigin: results[0],
                        count: results[1],
                    },
                    status: true
                })
            })
        } catch (error) {
            console.log(error);
            res.status(500)
                .json({
                    message: "lỗi hệ thống",
                    errors: error,
                    status: 500
                })
        }
    },

    getProfile: async (req, res) => {
        try {
            const brandOrigin = await BrandOrigin.find()
            res.json(brandOrigin)
        } catch (err) {
            res.send('Error ' + err)
        }
    },

}