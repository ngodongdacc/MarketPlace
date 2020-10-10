const async = require("async");
const Units = require("../Model/unit");

const UnitService = require("../Services/unitService");
// validator
const { error_400, error_500, success } = require("../validator/errors");


module.exports = {
    // tạo mới một đơn vị 
    create_unit: async (req, res, next) => {
        try {
            const { Name, IdCategory } = req.body
            const unit = req.body
            if (!Name)
                return error_400(res, "Hãy nhập tên đơn vị ") // kiểm tra name
            if (!IdCategory)
                return error_400(res, "Hãy nhập id danh mục", "IdCategory");// Kiểm tra IdCategory
            async.parallel([
                (cb) => {// kiểm tra name
                    if (Name)
                        UnitService.findName(Name, (err, resNameUnit) => {
                            if (err) cb(err)
                            else if (!resNameUnit) cb(null, true);
                            else cb(null, false);
                        })
                    else cb(null, true)
                },

            ], (err, results) => {
                if (err) return error_500(res, err);
                if (!results[0]) return error_400(res, "Tên đơn vị đã tồn tại");

                Units.create(unit, (err, resUint) => {
                    if (err) return error_500(res, err)

                    success(res, "Tạo một đơn vị thành công", resUint)
                })

            });

        } catch (error) {
           error_500(res, error);
        }

    },
     // chỉnh sửa đơn vị tính theo id
    update_unit: async (req, res, next) => {
        try {
            const { Name, IdCategory } = req.body
            const unit = req.body
            const id = req.params.id
            if (!id) return error_400(res, "Vui lòng nhập Id unit", "id");
            if (!unit.Name) return error_400(res, "Tên units không được rỗng", "Name");
            if (!unit.IdCategory) return error_400(res, "Id danh mục không được rổng", "IdCategory");
            
            async.parallel([
                (cb) => {// kiểm tra name
                    if (Name)
                        UnitService.findName(Name, (err, resNameUnit) => {
                            if (err) cb(err)
                            else if (!resNameUnit) cb(null, true);
                            else cb(null, false);
                        })
                    else cb(null, true)
                },

            ], (err, results) => {
                if (err) return error_500(res, err);
                if (!results[0]) return error_400(res, "Tên đơn vị đã tồn tại");
                Units.findById(id, (err, resUint) => {
                    if (err) return error_500(res, err)
                    if (!resUint) return error_400(res, "Không tìm thấy id đơn vị" + id, "id");

                    Units.findByIdAndUpdate(resUint._id, unit, { new: true })
                        .exec((err, resUpdate) => {
                            if (err) return error_500(res, err);
                            success(res, "Cập nhật đơn vị thành công", resUpdate)
                        })
                })

            });

        } catch (error) {
           error_500(res, error);
        }

    },
    // Lấy chi tiết đơn vị tính  bằng id
    get_unit: (req, res) => {
        const id = req.params.id
        if (!id) return error_400(res, "Vui lòng nhập id", "id");

        Units.findById(id, (err, resUint) => {
            if (err) return error_500(res, err)
            if (!resUint) return error_400(res, "Không tìm thấy id đơn vị tính" + id, "id");

            success(res, "Lấy chi tiết đơn vị  thành công", resUint);
        })

    },
    // lấy tất cẩ đơn vị
    get_units: async (req, res) => {
        try {
            const unit = await Units.find()

            res.json(unit)
        } catch (err) {
            res.send('Error ' + err)
        }
    },
    // Xóa đớn vị tính bằng id
    remove_unit: (req, res) => {
        const id = req.params.id
        if (!id) return error_400(res, "Vui lòng nhập id", "id");

        Units.findById(id, (err, resUint) => {
            if (err) return error_500(res, err);
            if (!resUint) return error_400(res, "Không tìm thấy id đơn vị " + id, "id");

            Units.findByIdAndRemove(resUint._id, (err, resRemove) => {
                if (err) error_500(res, err)
                success(res, "Xóa đơn vị thành công", resRemove)
            })
        })

    },
    //Lấy danh sách đơn vị tính
    get_list_unit: (req, res) => {
        const config = {};

        config.page = req.query.page ? Number(req.query.page) : 1
        config.limit = req.query.limit ? Number(req.query.limit) : 20
        config.skip = (config.page - 1) * config.limit;

        async.parallel([
            (cb) => Units
                .find({})
                .skip(config.skip)
                .limit(config.limit)
                .sort({ Date: "desc" })
                .exec((e, data) => e ? cb(e) : cb(null, data)),
            (cb) => Units.count().exec((e, data) => e ? cb(e) : cb(null, data))
        ], (err, results) => {
            if (err) return error_500(res, err);

            success(res, "Lấy danh sách đơn vị thành công",
                {
                    unit: results[0],
                    count: results[1],

                })

        })
    },
    // xóa danh sách đơn vị tính
    remove_list_unit: (req, res) => {
        const listId = req.body.ListId;
        if (!Array.isArray(listId))
            return error_400(res, "ListId phải là array", "ListId");

        if (!listId || (Array.isArray(listId) && listId.length === 0))
            return error_400(res, "Vui lòng chọn đơn vị cần xóa", "ListId");

        Units
            .deleteMany({ _id: { $in: listId } })
            .exec((err, resData) => {
                if (err) return error_500(res, err);
                success(res, `Xóa thành công ${resData.n} đơn vị`, resData)
            })

    },

    //Tìm kiếm theo tến
    search_unit: (req, res) => {

        try {


            const config = {};
            config.Name = req.query.Name
            config.page = req.query.page ? Number(req.query.page) : 1
            config.limit = req.query.limit ? Number(req.query.limit) : 20
            config.skip = (config.page - 1) * config.limit;
            const query = { Name: { $regex: config.Name, $options: "i" } };

            async.parallel([
                (cb) =>
                    Units.find(query)
                        .skip(config.skip)
                        .limit(config.limit)
                        .sort({ Date: "desc" })
                        .exec((e, data) => e ? cb(e) : cb(null, data)),
                (cb) => Units.count(query)
                    .exec((e, data) => e ? cb(e) : cb(null, data))

            ], (err, results) => {
                if (err) return error_500(res, err)
                success(res, "Lấy danh sách đơn vị thành công",
                    {
                        unit: results[0],
                        count: results[1],
                    })
            })

        } catch (error) {
            error_500(res, error);
        }
    },

}