
const CategoryService = require("../../Services/categoryService");
const { updateOne, count } = require("../../Model/category");
const async = require("async");
const { findOneCategory } = require("../../Services/categoryService");
const category = require("../../Model/category");
const mongoose = require("mongoose");
// const category = require("../Model/category");



module.exports = {
    createCategory : async(req, res , next) => {
        try { 
            const {Title} = req.body
            if(!Title){ return res.status(400).json({
                            message: "Please enter your Title",
                            status: false,
                            code: 0
                        })}
                
            const newCate = new category({
                Icon: req.body.Icon,
                Title: req.body.Title,
                Description: req.body.Description
                })
                
                category.findOne({Title: newCate.Title }, function (err, resData) {
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
                errors: errors,
                code: 0
            }).status(500) && next(e)
        }
    },

    // update
    updateCategory : async(req, res, next) => {
        var updateCate = { };
        if(req.body.Icon) updateCate.Icon = req.body.Icon;
        if(eq.body.Title) updateCate.Title = req.body.Title;
        if(req.body.Description) updateCate.Description = req.body.Description

        const id = req.params.id
        
        if(!id)return res.status(400).json({message: "id is required", status: false, code: 0})
        if(updateCate.Icon === "") return res.status(400).json({ message: "Icon not null", status: false, code: 0});
        if(updateCate.Title === "") return res.status(400).json({ message: "Title not null", status: false, code: 0});
        if(updateCate.Description === "") return res.status(400).json({ message: "Descriptio  not null", status: false, code: 0});
       
        CategoryService.findOneCateById(id,(err, resFindCate) => {
            if(err) return res.status(400).json({ message: "There was an error processing", errors: err, status: false});
            if(!resFindCate) return res.status(400).json({ message: "not find Category", data: null,status: false});

            async.parallel([
                (cb) => {
                    if(updateCate.Icon){
                        CategoryService.findOneCategory(updateCate.Icon, (err, resData) => {
                            if(err) cb(err)
                            else if(!resData || (resData && resData._id.toString() === id)) cb(null, true)
                            else cb(null, false)
                        })
                    }
                    else cb(null, true)  
                       
                },
                (cb) => {
                    if(updateCate.Title)
                         CategoryService.findOneCategory(updateCate.Title, (err, resData) => {
                         if(err) cb(err)
                         else if(!resData || (resData && resData._id.toString() === id)) cb(null, true)
                         else cb(null, false)
                     })
                     else cb(null, true) 
                    },
                    (cb) => {
                        if(updateCate.Description)
                             CategoryService.findOneCategory(updateCate.Description, (err, resData) => {
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
        category
            .aggregate([
                {
                    $lookup:
                    {
                        from: "subcategorys",
                        localField: "_id",
                        foreignField: "IdCategory",
                        as: "ListSubCategory"
                    }
                }
         ]).exec(function(err, results){
            if(err) {
                console.log(err);
                res.status(400)
                    .json({
                        message: "Có lỗi trong quá trình xử lý",
                        errors: err,
                        status: false
                    })
            } 
            
            res.json({
                message: "Lấy danh mục thành công",
                data: results,
                status: true
            })
         })     
    },
    get_detail_category : async ( req, res) => {
        if(!req.params.id) return res.status(400).json({message: "Vui lòng nhập vào Id danh mục"})
        category
            .aggregate([
                {
                    $match : { "_id" : new mongoose.Types.ObjectId(req.params.id) } 
                },
                {
                    $lookup:
                    {
                        from: "subcategorys",
                        localField: "_id",
                        foreignField: "IdCategory",
                        as: "ListSubCategory"
                    }
                }
         ]).exec(function(err, results){
            if(err) {
                console.log(err);
                res.status(400)
                    .json({
                        message: "Có lỗi trong quá trình xử lý",
                        errors: err,
                        status: false
                    })
            } 
            
            res.json({
                message: "Lấy danh mục thành công",
                data: results,
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