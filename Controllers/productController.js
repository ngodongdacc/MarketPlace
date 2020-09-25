const async = require("async");
const mongoose = require("mongoose");
const Products = require("../Model/product");
const keySevice = require("../Services/keySearchService");
const EscapeRegExp = require("escape-string-regexp");

const { IsJsonString } = require("../validator/validator");
module.exports = {
    create_product: (req, res) => {
        const product = req.body
        // product.Image = req.file.path
        // console.log(req.file.path);
        if (!product.IdUser) return res.status(400).json({ message: "Vui lòng nhập IdUser", status: false });
        if (!product.IdShop) return res.status(400).json({ message: "Vui lòng nhập IdShop", status: false });
        if (!product.IdCategory) return res.status(400).json({ message: "Vui lòng nhập IdCategory", status: false });
        if (!product.IdCategorySub) return res.status(400).json({ message: "Vui lòng nhập IdCategorySub", status: false });
        if (!product.Name) return res.status(400).json({ message: "Vui lòng nhập Name", status: false });

        Products.create(product, (err, resProduct) => {
            if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
            res.json({
                message: "Tạo sản phẩm thành công",
                data: resProduct,
                status: true
            })
        })
    },

    // Cập nhật sản phẩm
    update_product: (req, res) => {
        const product = req.body
        product.DateUpdate = Date.now();
        const id = req.params.id
        if (!id) return res.status(400).json({ message: "Vui lòng nhập Id sản phẩm", status: false });
        if (product.Name === "") return res.status(400).json({ message: "Tên sản phẩm không được rỗng", status: false });
        console.log("product:: ", req.body);
        Products.findById(id, (err, resProduct) => {
            if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
            if (!resProduct) return res.json({ message: "Không tìm thấy id sản phẩm", data: null, status: false });

            Products.findByIdAndUpdate(resProduct._id, { $set: product }, {}, (err, resUpdate) => {
                if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                res.json({
                    message: "Cập nhật sản phẩm thành công",
                    data: resUpdate,
                    status: true
                })
            })
        })
    },
    // Lấy chi tiết sản phẩm bằng id
    get_product: (req, res) => {
        const id = req.query.id
        if (!id) return res.status(400).json({ message: "Vui lòng nhập Id", status: false });

        Products.findById(id, (err, resProduct) => {
            if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
            if (!resProduct) return res.status(400).json({ message: "Không tìm thấy sản phẩm", data: null, status: false });

            res.json({
                message: "Lấy chi tiết sản phẩm thành công",
                data: resProduct,
                status: true
            })
        })
    },
    // Xóa sản phẩm bằng id
    remove_product: (req, res) => {
        const id = req.params.id
        if (!id) return res.status(400).json({ message: "Vui lòng nhập Id", status: false });

        Products.findById(id, (err, resProduct) => {
            if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
            if (!resProduct) return res.status(400).json({ message: "Không tìm thấy sản phẩm", data: null, status: false });

            Products.findByIdAndRemove(resProduct._id, (err, resRemove) => {
                if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                res.json({
                    message: "Xóa sản phẩm thành công",
                    data: resRemove,
                    status: true
                })
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
            if (err) if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
            res.json({
                message: "Lấy danh sách sản phẩm thành công",
                data: {
                    products: results[0],
                    count: results[1],
                },
                status: true
            })
        })
    },

    // xóa danh sách sản phẩm
    remove_list_product: (req, res) => {
        const listIdProduct = req.body.ListId;
        if (!listIdProduct || (Array.isArray(listIdProduct) && listIdProduct.length === 0)) return res.status(400).json({ message: "Vui lòng chọn sản phẩm cần xóa", status: false });
        if (!Array.isArray(listIdProduct)) return res.status(400).json({ message: "ListId phải là array", status: false });

        Products
            .deleteMany({ _id: { $in: listIdProduct } })
            .exec((err, resData) => {
                if (err) if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                res.send({
                    message: `Xóa thành công ${resData.n} sản phẩm`,
                    data: resData,
                    status: true
                })
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

            const query = { Name: { $regex: config.search, $options: "i" } }
            async.parallel([
                (cb) =>
                    Products.find(query)
                        .skip(config.skip)
                        .limit(config.limit)
                        .sort({ Date: "desc" })
                        .exec((e, data) => e ? cb(e) : cb(null, data)),
                (cb) => Products.count(query)
                    .exec((e, data) => e ? cb(e) : cb(null, data))
            ], (err, results) => {
                if (err) if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                res.json({
                    message: "Lấy danh sách sản phẩm thành công",
                    data: {
                        products: results[0],
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

    // tìm kiếm theo danh mục
    search_category: (req, res) => {
        const config = {};
        config.search = req.query.search || ""
        config.IdCategory = req.query.IdCategory
        config.page = req.query.page ? Number(req.query.page) : 1
        config.limit = req.query.limit ? Number(req.query.limit) : 20
        config.skip = (config.page - 1) * config.limit;

        if (!config.IdCategory) return res.status(400).json({ message: "Vui lòng nhập IdCategory", status: false })
        const query = {
            Name: { $regex: config.search, $options: "i" },
            IdCategory: new mongoose.mongo.ObjectId(config.IdCategory)
        }
        console.log(query);
        async.parallel([
            (cb) => Products.find(query)
                .skip(config.skip)
                .limit(config.limit)
                .sort({ Date: "desc" })
                .exec((e, data) => e ? cb(e) : cb(null, data)),

            (cb) => Products.count(query)
                .exec((e, data) => e ? cb(e) : cb(null, data))
        ], (err, results) => {
            console.log(err);
            if (err) if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
            res.json({
                message: "Lấy danh sách sản phẩm thành công",
                data: {
                    products: results[0],
                    count: results[1],
                },
                status: true
            })
        })
    },

    // Tìm kiếm nâng cao
    search: (req, res) => {
        if(req.query.sort && !IsJsonString(req.query.sort)) 
            return res.json({message: "sort phải là dạng json", status: false}) 

        let config = {
            limit: Number(req.query.limit) || process.env.LIMIT || 20,
            page: Number(req.body.page) || 1,
            sort:req.query.sort? JSON.parse(req.query.sort) : { "Date": -1 }
        }
        config.skip = (config.page - 1) * config.limit;

        async.waterfall([
            (cb) => {
                var query = {
                    $or: [
                        { $text: { $search: req.query.search || "" } },
                        { Name: new RegExp("^.*?" + EscapeRegExp(req.query.search || "") + ".*$", "i") },
                        // { ListCategory: { $elemMatch: { title:new RegExp("^.*?"+EscapeRegExp(req.query.search || ""))}}}
                    ],
                    $and: [
                        {
                            Price: { 
                                $gte: Number(req.query.minPrice) || 0 , 
                                $lt: Number(req.query.maxPrice) || Number(process.env.MAXPRICE) || 100000000000
                            },
                        }
                    ]
                };
                if(req.query.idCategory) query.$and.push({ IdCategory: new mongoose.mongo.ObjectId(req.query.idCategory) })
                if(req.query.idTrademark) query.$and.push({ IdTrademark: new mongoose.mongo.ObjectId(req.query.idTrademark) })
                if(req.query.idCategorySub) query.$and.push({ IdCategorySub: new mongoose.mongo.ObjectId(req.query.idCategorySub) })

                cb(null, query)
            },
            (query, cb) => {
                console.log("query:: ", query.$and[0]);
                async.parallel([
                    (cb) => Products
                        .aggregate([
                            // {$match: {$text: {$search: req.query.search || ""}}}, 
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
                            { $skip: config.skip },
                            { $limit: config.limit }
                        ])
                        .sort(config.sort)
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
                        keySevice.create_and_update_key(req.query,cb)
                    }
                ], (e, res) => e ? cb(e) : cb(null, res))

            }
        ], (err, results) => {
            console.log("error:: ", err);
            if (err) if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });

            res.json({
                message: "Lấy sản phẩm thành công",
                data: {
                    products: results[0],
                    counts: results[1][0] ? results[1][0].counts : 0
                },
                status: true
            })
        })
    }
}
