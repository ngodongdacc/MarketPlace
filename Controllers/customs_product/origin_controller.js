const Origin = require("../../Model/origin");
const OriginService = require("../../Services/originService");
const async = require("async");


module.exports = {
    create_origin:async (req, res, next) => {
        try {
            const { Country } = req.body
            if (!Country)
                return res.status(400) // kiểm tra Country
                    .json({
                        message: "Please enter your Country",
                        status: false,
                        code: 0
                    })
          
            const  origin = req.body
            async.parallel([
                (cb) => {// kiểm tra Country
                    if (Country)
                        OriginService.findCountry(Country, (err, resCountryOrigin) => {
                            if (err) cb(err)
                            else if (!resCountryOrigin) cb(null, true);
                            else cb(null, false);
                        })
                    else cb(null, true)
                },
               
            ], (err, results) => {
                if (err) return res.status(400).json({ message: "There was an error processing", errors: err });
                if (!results[0]) return res.status(400).json({ message: "Tết country đã tồn tại", status: false, code: 0 });

                Origin.create(origin, (err, resOrigin) => {
                    if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                    res.json({
                        message: "Tạo một Origin thành công",
                        data: resOrigin,
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
     update_origin: (req, res) => {
        const origin = req.body
        const id = req.params.id
        if (!id) return res.status(400).json({ message: "Vui lòng nhập Id Origin", status: false });
        if(!origin.Country) return res.status(400).json({message:"Tên xuất xứ đã tồn tại", errors:null, status: false});
        if (!origin.Country === "") return res.status(400).json({ message: "Country không được rỗng", status: false });
        console.log("origin:: ", req.body);
        Origin.findById(id, (err, resorigin) => {
            if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
            if (!resorigin) return res.json({ message: "Không tìm thấy id Xuất xứ", data: null, status: false });

            Origin.findByIdAndUpdate(resorigin._id, { $set: origin }, {}, (err, resUpdate) => {
                if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });

                res.json({
                    message: "Cập nhật một Origin thành công",
                    data: resUpdate,
                    status: true
                })
            })
        })
    },

    // Lấy chi tiết đơn vị tính  bằng id
    get_origin: (req, res)=> {
        const id = req.params.id
        if(!id) return res.status(400).json({message: "Vui lòng nhập Id", status:false});

        Origin.findById(id,(err,resorigin)=>{
            if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false});
            if(!resorigin) return res.status(400).json({message: "Không tìm thấy Xuất xứ",data: null,status:false});
            
            res.json({
                message: "Lấy chi tiết một origin thành công",
                data: resorigin,
                status: true
            })     
         })
    },
    // Xóa đớn vị tính bằng id
    remove_origin: (req, res) => {
        const id = req.params.id
        if (!id) return res.status(400).json({ message: "Vui lòng nhập Id", status: false });

        Origin.findById(id, (err, resorigin) => {
            if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
            if (!resorigin) return res.status(400).json({ message: "Không tìm thấy xuất xứ", data: null, status: false });

            Origin.findByIdAndRemove(resorigin._id, (err, resRemove) => {
                if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                res.json({
                    message: "Xóa một origin thành công",
                    data: resRemove,
                    status: true
                })
            })

        })

    },
     //Lấy danh sách xuất xứ
     get_list_origin: (req,res) => {
        const config = {};
        
        config.page = req.query.page ? Number(req.query.page):1 
        config.limit = req.query.limit ? Number(req.query.limit):20 
        config.skip = (config.page-1)*config.limit;
    
        async.parallel([
            (cb) => Origin
                        .find({})
                        .skip(config.skip)
                        .limit(config.limit)
                        .sort({Date: "desc"})
                        .exec((e,data) => e ? cb(e): cb(null, data)),
            (cb) => Origin.count().exec((e,data)=> e ? cb(e) : cb(null,data))
        ], (err,results) => {
            if(err) if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false });
            res.json({
                message: "Lấy danh sách origin thành công",
                data: {
                    origin: results[0],
                    count: results[1],
                },
                status: true
            }) 
        })
    },
    // xóa danh sách xuất xứ
    remove_list_origin: (req,res) => {
        const listIdOrigin = req.body.ListId;
        if(!listIdOrigin || (Array.isArray(listIdOrigin) && listIdOrigin.length === 0)) return res.status(400).json({message: "Vui lòng chọn sản phẩm cần xóa",status:false}); 
        if(!Array.isArray(listIdOrigin)) return res.status(400).json({message: "ListId phải là array",status:false}); 

        Origin
            .deleteMany({_id: {$in: listIdOrigin}})
            .exec((err,resData)=> {
                if(err) if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false });
                res.send({
                    message: `Xóa thành công ${resData.n} sản phẩm`,
                    data: resData,
                    status: true
                })
            })

    },
    search_origin: (req, res) => {
        try {
            
        
        const config = {};
        config.search = req.query.search 
        config.Country = req.query.Country
        config.page = req.query.page ? Number(req.query.page):1 
        config.limit = req.query.limit ? Number(req.query.limit):20 
        config.skip = (config.page-1)*config.limit;
        
        const query = { Country: { $regex: config.Country, $options: "i" }}
        async.parallel([
            (cb) => 
            Origin.find(query)
                        .skip()
                        .limit(config.limit)
                        .sort({Date: "desc"})
                        .exec((e,data) => e ? cb(e): cb(null, data)),
            (cb) => Origin.count(query)
                            .exec((e,data)=> e ? cb(e) : cb(null,data))
        ], (err,results) => {
            if(err) if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false });
            res.json({
                message: "Lấy danh sách origin  thành công",
                data: {
                    origin: results[0],
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

    getProfile : async (req, res) => {
       try{
           const origin = await Origin.find()
           res.json(origin)
       }catch(err){
           res.send('Error ' + err)
       }
      },
    
}