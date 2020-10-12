const async = require("async");
const Units = require("../../Model/unit");

const UnitService = require("../../Services/unitService");

module.exports = {
    create_unit:async (req, res, next) => {
        try {
            const { Name } = req.body
            if (!Name)
                return res.status(400) // kiểm tra name
                    .json({
                        message: "Please enter your Name",
                        status: false,
                        code: 0
                    })
          
            const  unit = req.body
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
                if (err) return res.status(400).json({ message: "There was an error processing", errors: err });
                if (!results[0]) return res.status(400).json({ message: "Tên đã tồn tại", status: false, code: 0 });

                Units.create(origin, (err, resUint) => {
                    if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                    res.json({
                        message: "Tạo một đơn vị thành công",
                        data: resUint,
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
    update_unit: (req, res) => {
        const unit = req.body
        const id = req.params.id
        if (!id) return res.status(400).json({ message: "Vui lòng nhập Id unit", status: false });
        if (unit.Name === "") return res.status(400).json({ message: "Tên units không được rỗng", status: false });
        console.log("unit:: ", req.body);
        Units.findById(id, (err, resUint) => {
            if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
            if (!resUint) return res.json({ message: "Không tìm thấy id sản phẩm", data: null, status: false });

            Units.findByIdAndUpdate(resUint._id, { $set: unit }, {}, (err, resUpdate) => {
                if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                res.json({
                    message: "Cập nhật một Units thành công",
                    data: resUpdate,
                    status: true
                })
            })
        })
    },
    // Lấy chi tiết đơn vị tính  bằng id
    get_unit: (req, res)=> {
        const id = req.params.id
        if(!id) return res.status(400).json({message: "Vui lòng nhập Id", status:false});

        Units.findById(id,(err,resUint)=>{
            if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false});
            if(!resUint) return res.status(400).json({message: "Không tìm thấy đơn vị tính",data: null,status:false});
            
            res.json({
                message: "Lấy chi tiết đơn vị tính thành công",
                data: resUint,
                status: true
            })
        })
    },
    get_units: async (req, res) => {
        try{
            const unit = await Units.find()
            
            res.json(unit)
        }catch(err){
            res.send('Error ' + err)
        }
    },
    // Xóa đớn vị tính bằng id
    remove_unit: (req, res) => {
        const id = req.params.id
        if (!id) return res.status(400).json({ message: "Vui lòng nhập Id", status: false });

        Units.findById(id, (err, resUint) => {
            if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
            if (!resUint) return res.status(400).json({ message: "Không tìm thấy Units", data: null, status: false });

            Units.findByIdAndRemove(resUint._id, (err, resRemove) => {
                if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                res.json({
                    message: "Xóa một units thành công",
                    data: resRemove,
                    status: true
                })
            })
        })
    },
    //Lấy danh sách đơn vị tính
    get_list_unit: (req,res) => {
        const config = {};
        
        config.page = req.query.page ? Number(req.query.page):1 
        config.limit = req.query.limit ? Number(req.query.limit):20 
        config.skip = (config.page-1)*config.limit;
    
        async.parallel([
            (cb) => Units
                        .find({})
                        .skip(config.skip)
                        .limit(config.limit)
                        .sort({Date: "desc"})
                        .exec((e,data) => e ? cb(e): cb(null, data)),
            (cb) => Units.count().exec((e,data)=> e ? cb(e) : cb(null,data))
        ], (err,results) => {
            if(err) if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false });
            res.json({
                message: "Lấy danh sách đơn vị tính thành công",
                data: {
                    unit: results[0],
                    count: results[1],
                },
                status: true
            }) 
        })
    },
    // xóa danh sách xuất xứ
    remove_list_unit: (req,res) => {
        const listIdUnit = req.body.ListId;
        if(!listIdUnit || (Array.isArray(listIdUnit) && listIdUnit.length === 0)) return res.status(400).json({message: "Vui lòng chọn sản phẩm cần xóa",status:false}); 
        if(!Array.isArray(listIdUnit)) return res.status(400).json({message: "ListId phải là array",status:false}); 

        Units
            .deleteMany({_id: {$in: listIdUnit}})
            .exec((err,resData)=> {
                if(err) if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false });
                res.send({
                    message: `Xóa thành công ${resData.n} sản phẩm`,
                    data: resData,
                    status: true
                })
            })

    },
    search_unit: (req, res) => {
        try {
            
        
        const config = {};
        config.search = req.query.search 
        config.Name = req.query.Name
        config.page = req.query.page ? Number(req.query.page):1 
        config.limit = req.query.limit ? Number(req.query.limit):20 
        config.skip = (config.page-1)*config.limit;
        
        const query = { Name: { $regex: config.Name, $options: "i" }}
        async.parallel([
            (cb) => 
            Units.find(query)
                        .skip()
                        .limit(config.limit)
                        .sort({Date: "desc"})
                        .exec((e,data) => e ? cb(e): cb(null, data)),
            (cb) => Units.count(query)
                            .exec((e,data)=> e ? cb(e) : cb(null,data))
        ], (err,results) => {
            if(err) if(err) return res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err,status:false });
            res.json({
                message: "Lấy danh sách Xuất xứ  thành công",
                data: {
                    unit: results[0],
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