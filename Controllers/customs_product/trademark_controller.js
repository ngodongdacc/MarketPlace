const Trademark = require("../../Model/trademark");
const TrademarkService = require("../../Services/trademarkService");
const async = require("async");
// validator
const { error_400, error_500, success } = require("../../validator/errors");
module.exports = {
    //tạo mới một thương hiệu 
    create_trademark: async (req, res, next) => {
        try {
            const { Name, IdCategory, IdCategorySub } = req.body
            const trademark = req.body
            if (!Name)
                return error_400(res, "Hãy nhập tên thương hiệu ", "Name"); // kiểm tra name
            if (!IdCategory)
                return error_400(res, "Hãy nhập id danh mục", "IdCategory");// Kiểm tra IdCategory
            if (!IdCategorySub)
                return error_400(res, "Hãy nhập id danh muc con ", "IdCategory");//Kiểm tra IdCategorySub
            async.parallel([
                (cb) => {// kiểm tra name
                    if (Name)
                        TrademarkService.findName(Name, (err, resNameTrademark) => {
                            if (err) cb(err)
                            else if (!resNameTrademark) cb(null, true);
                            else cb(null, false);
                        })
                    else cb(null, true)
                },

            ], (err, results) => {
                if (err) return error_500(res, err);
                if (!results[0]) return error_400(res, "Tên thương hiệu đã tồn tại");

                Trademark.create(trademark, (err, resTrademark) => {
                    if (err) return error_500(res, err)

                    success(res, "Tạo mới một thương hiệu thành công", resTrademark)
                })

            });

        } catch (error) {
            error_500(res, error);
        }

    },
    // chỉnh sửa thương hiệu theo id
    update_trademark: async (req, res, next) => {
        try {
            const { Name, IdCategory, IdCategorySub } = req.body
            const trademark = req.body
            const id = req.params.id
            if (!id)
                return error_400(res, "Vui lòng nhập Id thương hiệu", "id");
            if (!trademark.Name)
                return error_400(res, "Tên thương hiệu không được rỗng", "Name");
            if (!trademark.IdCategory)
                return error_400(res, "Id danh mục không được rổng", "IdCategory");
            if (!trademark.IdCategorySub)
                return error_400(res, "Id danh mục con khồng được rổng", "IdCategorySub")
            async.parallel([
                (cb) => {// kiểm tra name
                    if (Name)
                        TrademarkService.findName(Name, (err, resNameTrademark) => {
                            if (err) cb(err)
                            else if (!resNameTrademark) cb(null, true);
                            else cb(null, false);
                        })
                    else cb(null, true)
                },

            ], (err, results) => {
                if (err) return error_500(res, err);
                if (!results[0]) return error_400(res, "Tên thương hiệu đã tồn tại");

                Trademark.findById(id, (err, resTrademark) => {
                    if (err) return error_500(res, err)
                    if (!resTrademark)
                        return error_400(res, "Không tìm thấy id thương hiệu" + id, "id");

                    Trademark.findByIdAndUpdate(resTrademark._id, trademark, { new: true })
                        .exec((err, resUpdate) => {
                            if (err) return error_500(res, err);
                            success(res, "Cập nhật thương hiệu thành công", resUpdate)
                        })
                })

            });

        } catch (error) {
            error_500(res, error);
        }

    },
    // Lấy chi tiết thương hiệu bằng id
    get_trademark: (req, res) => {
        const id = req.params.id
        if (!id) return error_400(res, "Vui lòng nhập id", "id");

        Trademark.findById(id, (err, resTrademark) => {
            if (err) return error_500(res, err)
            if (!resTrademark)
                return error_400(res, "Không tìm thấy id thương hiệu" + id, "id");

            success(res, "Lấy chi tiết thương hiệu thành công", resTrademark);
        })

    },
    //Lấy thương hiệu thao danh mục
    get_trademark_IdCategorySub:(req, res)=> {
        const { IdCategorySub } = req.body
        const trademark = req.body
        if (!IdCategorySub) return error_400(res, "Vui lòng nhập id", "id");

        Trademark.findById(IdCategorySub, (err, resTrademark) => {
            if (err) return error_500(res, err)
            if (!resTrademark)
                return error_400(res, "Không tìm thấy id thương hiệu" + IdCategorySub, "IdCategorySub");

            success(res, "Lấy thương hiệu thành công", resTrademark);
        })

    },
    // lấy tất cả thương hiệu
    get_trademarks: async (req, res) => {
        try {
            const trademark = await Trademark.find()

            res.json(trademark)
        } catch (err) {
            res.send('Error ' + err)
        }
    },
    // Xóa đớn vị tính bằng id
    remove_trademark: (req, res) => {
        const id = req.params.id
        if (!id) return error_400(res, "Vui lòng nhập id", "id");

        Trademark.findById(id, (err, resTrademark) => {
            if (err) return error_500(res, err);
            if (!resTrademark)
                return error_400(res, "Không tìm thấy id thương hiệu " + id, "id");

            Trademark.findByIdAndRemove(resTrademark._id, (err, resRemove) => {
                if (err) error_500(res, err)
                success(res, "Xóa thương hiệu thành công", resRemove)
            })
        })

    },
    //Lấy danh sách thương hiệu
    get_list_trademark: (req, res) => {
        const config = {};

        config.page = req.query.page ? Number(req.query.page) : 1
        config.limit = req.query.limit ? Number(req.query.limit) : 20
        config.skip = (config.page - 1) * config.limit;

        async.parallel([
            (cb) => Trademark
                .find({})
                .skip(config.skip)
                .limit(config.limit)
                .sort({ Date: "desc" })
                .exec((e, data) => e ? cb(e) : cb(null, data)),
            (cb) => Trademark.count().exec((e, data) => e ? cb(e) : cb(null, data))
        ], (err, results) => {
            if (err) return error_500(res, err);

            success(res, "Lấy danh sách thương hiệu thành công",
                {
                    unit: results[0],
                    count: results[1],
                })
        })
    },
    // xóa danh sách thương hiệu
    remove_list_trademark: (req, res) => {
        const listId = req.body.ListId;
        if (!Array.isArray(listId))
            return error_400(res, "ListId phải là array", "ListId");

        if (!listId || (Array.isArray(listId) && listId.length === 0))
            return error_400(res, "Vui lòng chọn thương hiệu cần xóa", "ListId");

        Trademark
            .deleteMany({ _id: { $in: listId } })
            .exec((err, resData) => {
                if (err) return error_500(res, err);
                success(res, `Xóa thành công ${resData.n} đơn vị`, resData)
            })

    },

    //Tìm kiếm theo tến
    search_trademark: (req, res) => {

        try {


            const config = {};
            config.Name = req.query.Name
            config.page = req.query.page ? Number(req.query.page) : 1
            config.limit = req.query.limit ? Number(req.query.limit) : 20
            config.skip = (config.page - 1) * config.limit;
            const query = { Name: { $regex: config.Name, $options: "i" } };

            async.parallel([
                (cb) =>
                    Trademark.find(query)
                        .skip(config.skip)
                        .limit(config.limit)
                        .sort({ Date: "desc" })
                        .exec((e, data) => e ? cb(e) : cb(null, data)),
                (cb) => Trademark.count(query)
                    .exec((e, data) => e ? cb(e) : cb(null, data))

            ], (err, results) => {
                if (err) return error_500(res, err)
                success(res, "Lấy danh sách thương hiệu thành công",
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