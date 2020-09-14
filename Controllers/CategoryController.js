
const CategoryService = require("../Services/categoryService");
const { updateOne, count } = require("../Model/category");
const async = require("async");
const { findOneCategory } = require("../Services/categoryService");
const category = require("../Model/category");
// const category = require("../Model/category");



module.exports = {
    createCategory : async(req, res , next) => {
        try { 
            const {title} = req.body
            if(!title){ return res.status(400).json({
                            message: "Please enter your Title",
                            status: false,
                            code: 0
                        })}
                
            const newCate = new category({
                icon: req.body.icon,
                title: req.body.title,
                description: req.body.description
                })
                
                category.findOne({title: title }, function (err, resData) {
                            if(err) return res.status(400).json({message:  "There was an error processing", errors: err, status: false}); 
                            
                            if(resData) return res.status(400).json({message:  "Tên danh mục đã tồn tại", errors: null, status: false}); 
                            
                            category.create(newCate, function(err,resData){
                                if(err) res.status(400).json({message: "Có lỗi trong quá trình xử lý",errors: err, status: false});
                                res.json({
                                    message: "Thêm danh mục thành công",
                                    data: resData,
                                    status: true
                                })
                            })
                        })  
        }catch (e) {
            console.log(e);
            res.send({
                message: "Có lỗi trong quá trình xử lý",
                errors: e.errors,
                code: 0
            }).status(500) && next(e)
        }
    },

    // update
    updateCategory : async(req, res, next) => {
        var updateCate = { };
        if(req.body.icon) updateCate.icon = req.body.icon;
        if(req.body.title) updateCate.title = req.body.title;
        if(req.body.description) updateCate.description = req.body.description

        const id = req.params.id
        
        if(!id)return res.status(400).json({message: "id is required", status: false, code: 0})
        if(updateCate.icon === "") return res.status(400).json({ message: "Icon not null", status: false, code: 0});
        if(updateCate.title === "") return res.status(400).json({ message: "Title not null", status: false, code: 0});
        if(updateCate.description === "") return res.status(400).json({ message: "Descriptio  not null", status: false, code: 0});
       
        CategoryService.findOneCateById(id,(err, resFindCate) => {npm
            if(err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false});
            if(!resFindCate) return res.status(400).json({ message: "not find Category", data: null,status: false});

            async.parallel([
                (cb) => {
                    if(updateCate.icon){
                        CategoryService.findOneCategory(updateCate.icon, (err, resData) => {
                            if(err) cb(err)
                            else if(!resData || (resData && resData._id.toString() === id)) cb(null, true)
                            else cb(null, false)
                        })
                    }
                    else cb(null, true)  
                       
                },
                (cb) => {
                    if(updateCate.title)
                         CategoryService.findOneCategory(updateCate.title, (err, resData) => {
                         if(err) cb(err)
                         else if(!resData || (resData && resData._id.toString() === id)) cb(null, true)
                         else cb(null, false)
                     })
                     else cb(null, true) 
                    },
                    (cb) => {
                        if(updateCate.description)
                             CategoryService.findOneCategory(updateCate.description, (err, resData) => {
                             if(err) cb(err)
                             else if(!resData || (resData && resData._id.toString() === id)) cb(null, true)
                             else cb(null, false)
                         })
                         else cb(null, true) 
                   }
            ],(err, results) => {
                if(err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false});
                if(!results[0]) return res.status(400).json({ message: "Icon already exists", status: false, code:0 });
                if(!results[1]) return res.status(400).json({ message: "Title already exists", status: false, code:0 });
                if(!results[2]) return res.status(400).json({ message: "Description already exists", status: false, code:0 });

                updateCate.id = id
                CategoryService.updateCategory(updateCate,(err, resData) => {
               
                    if(err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false});
                    return res.json({
                        message: "update user success",
                        data: resData,
                        status: true,
                        code: 1
                    })
                })
            })
        })
    },

    deleteCategory : async(req, res) => {
        const {id} = req.body
        if(!id) return res.status(400).json({message: "id is required", status: false, code: 0 })

        CategoryService.findOneCateById(id, (err, resData) => {
            if(err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false});
            if(!resData) return res.status(400).json({ message: "Not find Category", errors: err, status: false});

            CategoryService.removeCateById(resData._id, (err,resRemoveCate) => {
                if(err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false});
                res.json({
                    message: "Delete category success",
                    data: resRemoveCate,
                    status: true,
                    code: 1
                })
            })
        })
    },



    getCategory : async ( req, res) => {
        const getCate = {
            _id: req.params._id,
            icon: req.params.icon,
            title: req.params.title,
            name: req.params.name
        };
        CategoryService.getCategory(getCate, function(err,resData){
            if(err){
                return res.send({
                    message: "get Category failse",
                    errors: err,
                    status: false,
                }).status(400)
            }
            res.send({
                message: "get succsess",
                data: resData,
                status: true
            })
        })
    },


    searchCategory : async(req, res) => {
        const search = {
            text: req.query.search,
            limit: req.query.limit || 10,
            page: req.query.page || 1
        }

        search.skip = (search.page -1)*search.limit;
        async.parallel([
            (cb) => {
                CategoryService.searchCategory(search, (err, data) => {
                    if(err) returncb(err)
                    cb(null,data)
                })
            },
            (cb) => {
                CategoryService.countCategory((err,count)=>{
                    if(err) return cb(err);
                    cb(null,count);
                })
            }
        ],
        (err,results) => {
            if(err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false});
            res.json({
                message: "search category success",
                data: {
                  category: results[0],
                  count: results[1]
                }
            })
        })
    }
}