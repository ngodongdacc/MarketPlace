const async = require("async");
const Products = require("../Model/product");

module.exports = {
    create_product: (req, res)=> {
        const product = req.body
        product.Image = req.file.path
        console.log(req.file.path);
        if(!product.IdUser) return res.status(400).json({message: "Vui lòng nhập IdUser", status:false});
        if(!product.IdShop) return res.status(400).json({message: "Vui lòng nhập IdShop",status: false});
        if(!product.IdCategory) return res.status(400).json({message: "Vui lòng nhập IdCategory",status: false});
        if(!product.IdCategorySub) return res.status(400).json({message: "Vui lòng nhập IdCategorySub",status: false});
        if(!product.Name) return res.status(400).json({message: "Vui lòng nhập Name", status: false});

        Products.create(product,(err,resProduct)=>{
            if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false});
            res.json({
                message: "Tạo sản phẩm thành công",
                data: resProduct,
                status: true
            })
        })
    },
    update_product: (req, res)=> {
        const product = req.body
        product.DateUpdate = Date.now();
        const id = req.params.id
        if(!id) return res.status(400).json({message: "Vui lòng nhập Id sản phẩm", status:false});
        if(product.Name === "") return res.status(400).json({message: "Tên sản phẩm không được rỗng", status: false});
        console.log("product:: ",req.body);
        Products.findById(id,(err,resProduct) => {
            if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false});
            if(!resProduct) return res.json({message: "Không tìm thấy id sản phẩm",data: null,status:false});

            Products.findByIdAndUpdate(resProduct._id, {$set: product},{},(err,resUpdate)=>{
                if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false});
                res.json({
                    message: "Cập nhật sản phẩm thành công",
                    data: resUpdate,
                    status: true
                })
            })
        })  
    },
    // Lấy chi tiết sản phẩm bằng id
    get_product: (req, res)=> {
        const id = req.query.id
        if(!id) return res.status(400).json({message: "Vui lòng nhập Id", status:false});

        Products.findById(id,(err,resProduct)=>{
            if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false});
            if(!resProduct) return res.status(400).json({message: "Không tìm thấy sản phẩm",data: null,status:false});
            
            res.json({
                message: "Lấy chi tiết sản phẩm thành công",
                data: resProduct,
                status: true
            })
        })
    },
    // Xóa sản phẩm bằng id
    remove_product: (req, res)=> {
        const id = req.params.id
        if(!id) return res.status(400).json({message: "Vui lòng nhập Id", status:false});

        Products.findById(id,(err,resProduct)=>{
            if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false});
            if(!resProduct) return res.status(400).json({message: "Không tìm thấy sản phẩm",data: null,status:false});
            
            Products.findByIdAndRemove(resProduct._id,(err,resRemove)=> {
                if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false});
                res.json({
                    message: "Xóa sản phẩm thành công",
                    data: resRemove,
                    status: true
                })
            })
        })
    },

    //Lấy danh sách sản phẩm
    get_list_product: (req,res) => {
        const config = {};
        
        config.page = req.query.page ? Number(req.query.page):1 
        config.limit = req.query.limit ? Number(req.query.limit):20 
        config.skip = (config.page-1)*config.limit;
    
        async.parallel([
            (cb) => Products
                        .find({})
                        .skip(config.skip)
                        .limit(config.limit)
                        .sort({Date: "desc"})
                        .exec((e,data) => e ? cb(e): cb(null, data)),
            (cb) => Products.count().exec((e,data)=> e ? cb(e) : cb(null,data))
        ], (err,results) => {
            if(err) if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false });
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
    remove_list_product: (req,res) => {
        const listIdProduct = req.body.ListId;
        if(!listIdProduct || (Array.isArray(listIdProduct) && listIdProduct.length === 0)) return res.status(400).json({message: "Vui lòng chọn sản phẩm cần xóa",status:false}); 
        if(!Array.isArray(listIdProduct)) return res.status(400).json({message: "ListId phải là array",status:false}); 

        Products
            .deleteMany({_id: {$in: listIdProduct}})
            .exec((err,resData)=> {
                if(err) if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false });
                res.send({
                    message: `Xóa thành công ${resData.n} sản phẩm`,
                    data: resData,
                    status: true
                })
            })
    },

    search_product: (req, res) => {
        try {
            
        
        const config = {};
        config.search = req.query.search 
        config.page = req.query.page ? Number(req.query.page):1 
        config.limit = req.query.limit ? Number(req.query.limit):20 
        config.skip = (config.page-1)*config.limit;
        
        const query = { Name: { $regex: config.search.toLowerCase(), $options: "i" }}
        async.parallel([
            (cb) => 
            Products.find(query)
                        .skip()
                        .limit(config.limit)
                        .sort({Date: "desc"})
                        .exec((e,data) => e ? cb(e): cb(null, data)),
            (cb) => Products.count(query)
                            .exec((e,data)=> e ? cb(e) : cb(null,data))
        ], (err,results) => {
            if(err) if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false });
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

}
