const async = require("async");
const mongoose = require("mongoose");
const Products = require("../../Model/product");
const keySevice = require("../../Services/keySearchService");
const EscapeRegExp = require("escape-string-regexp");

// validator
const { error_400, error_500, success } = require("../../validator/errors");
const { IsJsonString } = require("../../validator/validator");

module.exports = {
    create_product: (req, res) => {
        const product = req.body
        // product.Image = req.file.path
        // console.log(req.file.path);
        if (!product.IdUser || product.IdUser === "")
            return error_400(res, "Vui lòng nhập id người dùng", "product.IdUser");

        if (!product.IdShop || product.IdShop == "")
            return error_400(res, "Vui lòng nhập id của shop", "product.IdShop");

        if (!product.IdCategory || product.IdCategory === "")
            return error_400(res, "Vui lòng nhập id của danh mục cha",
                "product.IdCategory");

        if (!product.IdCategorySub || product.IdCategorySub === "")
            return error_400(res, "Vui lòng nhập id của danh mục con",
                "product.IdCategorySub");

        if (!product.Name || product.Name === "")
            return error_400(res, "Vui lòng nhập tên của sản phẩm", "product.Name");

        Products.create(product, (err, resProduct) => {
            if (err) return error_500(res, err)

            success(res, "Tạo sản phẩm thành công", resProduct)
        })
    },

    // Cập nhật sản phẩm
    update_product: (req, res) => {

        const product = req.body
        product.DateUpdate = Date.now();
        const id = req.params.id

        if (!id) return error_400(res, "Vui lòng nhập Id sản phẩm", "id");

        if (product.Name && product.Name === "")
            return error_400(res, "Tên sản phẩm không được rỗng", "product.Name");

        Products.findById(id, (err, resProduct) => {
            if (err) return error_500(res, err)
            if (!resProduct)
                return error_400(res, "Không tìm thấy id sản phẩm" + id, "id");

            Products.findByIdAndUpdate(resProduct._id, product, { new: true })
                .exec((err, resUpdate) => {
                    if (err) return error_500(res, err);
                    success(res, "Cập nhật sản phẩm thành công", resUpdate)
                })
        })
    },

    // Lấy chi tiết sản phẩm bằng id
    get_product: (req, res) => {
        const id = req.query.id
        if (!id) return error_400(res, "Vui lòng nhập id", "id");

        Products.findById(id, (err, resProduct) => {
            if (err) return error_500(res, e);
            if (!resProduct)
                return error_400(res, "Không tìm thấy sản phẩm" + id, "id");

            success(res, "Lấy chi tiết sản phẩm thành công", resProduct);
        })
    },

    // Xóa sản phẩm bằng id
    remove_product: (req, res) => {
        const id = req.params.id
        if (!id) return error_400(res, "Vui lòng nhập id", "id");

        Products.findById(id, (err, resProduct) => {
            if (err) return error_500(res, err);
            if (!resProduct)
                return error_400(res, "Không tìm thấy sản phẩm" + id, id);

            Products.findByIdAndRemove(resProduct._id, (err, resRemove) => {
                if (err) error_500(res, err)
                success(res, "Xóa sản phẩm thành công", resRemove)
            })
        })
    },

    //Lấy danh sách sản phẩm
    get_list_product: (req, res) => {
        const config = {};

        config.page = req.query.page ? Number(req.query.page) : 1
        config.limit = req.query.limit ? Number(req.query.limit) : 20
        config.skip = (config.page - 1) * config.limit;

        async.parallel([
            (cb) => Products
                .find({})
                .skip(config.skip)
                .limit(config.limit)
                .sort({ Date: "desc" })
                .exec((e, data) => e ? cb(e) : cb(null, data)),

            (cb) => Products.count().exec((e, data) => e ? cb(e) : cb(null, data))

        ], (err, results) => {
            if (err) return error_500(res, err);

            success(res, "Lấy danh sách sản phẩm thành công",
                {
                    products: results[0],
                    count: results[1],
                })
        })
    },

    // xóa danh sách sản phẩm
    remove_list_product: (req, res) => {

        const listId = req.body.ListId;

        if (!Array.isArray(listId))
            return error_400(res, "ListId phải là array", "ListId");

        if (!listId || (Array.isArray(listId) && listId.length === 0))
            return error_400(res, "Vui lòng chọn sản phẩm cần xóa", "ListId");

        Products
            .deleteMany({ _id: { $in: listId } })
            .exec((err, resData) => {
                if (err) return error_500(res, err);
                success(res, `Xóa thành công ${resData.n} sản phẩm`, resData)
            })
    },

    // Tìm kiếm theo tên
    search_product: (req, res) => {
        try {
            const config = {};
            config.search = req.query.search
            config.page = req.query.page ? Number(req.query.page) : 1
            config.limit = req.query.limit ? Number(req.query.limit) : 20
            config.skip = (config.page - 1) * config.limit;
            const query = { Name: { $regex: config.search || "", $options: "i" } };

            async.parallel([
                (cb) =>
                    Products.find(query)
                        .skip(config.skip)
                        .limit(config.limit)
                        .sort({ Date: "desc" })
                        .exec((e, data) => e ? cb(e) : cb(null, data)),
                (cb) => Products.countDocuments(query)
                    .exec((e, data) => e ? cb(e) : cb(null, data))

            ], (err, results) => {
                if (err) return error_500(res, err)
                success(res, "Lấy danh sách sản phẩm thành công",
                    {
                        products: results[0],
                        count: results[1],
                    })
            })

        } catch (error) {
            error_500(res, error);
        }
    },

    // tìm kiếm theo danh mục
    search_category: (req, res) => {
        const config = {};
        config.search = req.query.search || ""
        config.IdCategory = req.query.IdCategory
        config.page = req.query.page ? Number(req.query.page) : 1
        config.limit = req.query.limit ? Number(req.query.limit) : 20
        config.skip = (config.page - 1) * config.limit;

        if (!config.IdCategory)
            return error_400(res, "Vui lòng nhập IdCategory", IdCategory)

        const query = {
            Name: { $regex: config.search, $options: "i" },
            IdCategory: new mongoose.mongo.ObjectId(config.IdCategory)
        }

        async.parallel([
            (cb) => Products.find(query)
                .skip(config.skip)
                .limit(config.limit)
                .sort({ Date: "desc" })
                .exec((e, data) => e ? cb(e) : cb(null, data)),

            (cb) => Products.count(query)
                .exec((e, data) => e ? cb(e) : cb(null, data))
        ], (err, results) => {
            if (err) return error_500(res, err);
            success(res, "Lấy danh sách sản phẩm thành công", {
                products: results[0],
                count: results[1],
            })
        })
    },

    // Tìm kiếm nâng cao
    search: (req, res) => {
        let params = req.query; 
        if (params.sort && !IsJsonString(params.sort))
            return error_500(res, "sort phải là dạng json", "sort")

        let config = {
            limit: Number(params.limit) || process.env.LIMIT || 20,
            page:  Number(params.page) || 1,
            sort: params.sort ? JSON.parse(params.sort) : { "Date": -1 }
        }
        config.skip = (config.page - 1) * config.limit;
        console.log(config.skip);
        async.waterfall([
            (cb) => {
                var query = {
                    $or: [
                        { $text: { $search: params.search || "" } },
                        {
                            Name: new RegExp("^.*?" +
                                EscapeRegExp(params.search || "") + ".*$", "i")
                        },
                    ],
                    $and: [
                        {
                            Price: {
                                $gte: Number(params.minPrice) || 0,
                                $lt: Number(params.maxPrice) ||
                                    Number(process.env.MAXPRICE) || 100000000000
                            },
                        }
                    ]
                };
                if (params.idCategory)
                    query.$and.push({
                        IdCategory:
                            new mongoose.mongo.ObjectId(params.idCategory)
                    });

                if (params.idTrademark)
                    query.$and.push({
                        IdTrademark:
                            new mongoose.mongo.ObjectId(params.idTrademark)
                    });

                if (params.idCategorySub)
                    query.$and.push({
                        IdCategorySub:
                            new mongoose.mongo.ObjectId(params.idCategorySub)
                    })
                
                if (params.statusSale === "true" || params.statusSale === "false")
                    query.$and.push({ StatusSale: JSON.parse(params.statusSale)})
                
                if (params.statusNew === "true" || params.statusNew === "false")
                    query.$and.push({ StatusNew: JSON.parse(params.statusNew)})
                
                cb(null, query)
            },
            (query, cb) => {
                async.parallel([
                    (cb) => Products
                        .aggregate([
                            { $match: query },
                            {
                                $lookup: // danh mục
                                {
                                    from: "categorys",
                                    localField: "IdCategory",
                                    foreignField: "_id",
                                    as: "Category",
                                },
                            },
                            {
                                $lookup: // thương hiệu
                                {
                                    from: "trademarks",
                                    localField: "IdTrademark",
                                    foreignField: "_id",
                                    as: "Trademark",
                                },
                            },
                        ])
                        .sort(config.sort)
                        .skip(config.skip)
                        .limit(config.limit)
                        .exec((e, p) => e ? cb(e) : cb(null, p)),
                    (cb) => Products
                        .aggregate([
                            { $match: query },
                            {
                                $lookup: // danh mục
                                {
                                    from: "categorys",
                                    localField: "IdCategory",
                                    foreignField: "_id",
                                    as: "Category",
                                },
                            },
                            {
                                $lookup: // thương hiệu
                                {
                                    from: "trademarks",
                                    localField: "IdTrademark",
                                    foreignField: "_id",
                                    as: "Trademark",
                                },
                            },
                            {
                                $count: "counts"
                            }
                        ])
                        .exec((e, c) => e ? cb(e) : cb(null, c)),
                    (cb) => { // lưu lịch sử tìm kiếm
                        keySevice.create_and_update_key(params, cb)
                    }
                ], (e, result) => e ? cb(e) : cb(null, result))

            }
        ], (err, results) => {
            if (err) return error_500(res, err)

            res.json({
                message: "Lấy sản phẩm thành công",
                data: {
                    products: results[0],
                    counts: results[1][0] ? results[1][0].counts : 0
                },
                status: true
            })
        })
    },

    // Lấy danh sách sản phẩm theo shop
    search_product_shop: (req, res) => {
        let params = req.query;

        if (!req.user) return error_400(res, "Vui lòng đăng nhập", "user");

        if (params.sort && !IsJsonString(params.sort))
            return error_500(res, "sort phải là dạng json", "sort");

        let limit = params.limit ? Number(params.limit) : process.env.LIMIT || 20
        let page = params.page ? Number(params.limit) : process.env.PAGE || 1
        let skip = (page - 1) * limit;
        let sort = params.sort ? JSON.parse(params.sort) : { Date: -1 };

        let query = {
            $and: [
                {
                    IdShop: new mongoose.mongo.ObjectId(req.user._id),
                    Price: {
                        $gte: Number(req.query.minPrice) || 0,
                        $lt: Number(req.query.maxPrice) ||
                            Number(process.env.MAXPRICE) || 100000000000
                    },
                }
            ]
        };

        if (params.search && params.search !== "")
            query.$or = [
                { $text: { $search: req.query.search } },
                {
                    Name: new RegExp("^.*?" +
                        EscapeRegExp(req.query.search) + ".*$", "i")
                },
            ]

        if (req.query.idCategory)
            query.$and.push({
                IdCategory:
                    new mongoose.mongo.ObjectId(req.query.idCategory)
            });

        if (req.query.idTrademark)
            query.$and.push({
                IdTrademark:
                    new mongoose.mongo.ObjectId(req.query.idTrademark)
            });

        if (req.query.idCategorySub)
            query.$and.push({
                IdCategorySub:
                    new mongoose.mongo.ObjectId(req.query.idCategorySub)
            })

        async.parallel([
            cb => Products
                .aggregate([{ $match: query }])
                .limit(limit)
                .skip(skip)
                .sort(sort)
                .exec((e, r) => e ? cb(e) : cb(null, r)),

            cb => Products.countDocuments(query)
                .exec((e, c) => e ? cb(e) : cb(null, c))
        ], (e, results) => {
            if (e) return error_500(res, e);

            success(res, "Lấy danh sách sản phẩm shop thành công",
                {
                    products: results[0],
                    count: results[1]
                }
            )
        })


    }
}
