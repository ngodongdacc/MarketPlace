const Categories = require("../Model/category");
const CategoryService = require("../Services/categoryService");
const { updateOne } = require("../Model/category");

const postCreateCategory = async (req, res) => {
        var newCategory = new Categories({
            title: req.body.title,
            description: req.body.description,
        });
        CategoryService.createCategory(newCategory, function(err, resData){
            if(err){
                return res.send({
                    message: "create user fail",
                    data: null,
                    errors: err.errors,
                    code: 0,
                    status: false,
                  }).status(400)
            }
    
            res.send({
                message: "thêm danh mục thành công",
                data: resData
            })
        });
    }
    const updateCategory = async(req, res) => {
        var updateCate = {
            id: req.body.id,
            title: req.body.title,
            description: req.body.description
        };
        CategoryService.updateCategory(updateCate, function(err, resData){
            if(err){
                return res.send({
                    message: "Update error",
                    errors: err,
                    status: false,
                }).status(400)
            }
            res.send({
                message: "update success!",
                data: resData,
                status: true
            })
        });

    }

    const deleteCategory = async(req, res) => {
        var deleteCate = {
            _id: req.body.id,
            title: req.body.title,
            description: req.body.description
        };
        CategoryService.deleteCategory(deleteCate, function(err, resData){
            if(err){
                return res.send({
                    message: "delete failse",
                    errors: err,
                    status: false,
                }).status(400)
            }
            res.send({
                message: "delete success!",
                data: resData,
                status: true
            })
        })
    }

    const getCategory = async(req, res) => {
        var getCate = {
            _id: req.params.id,
            title: req.params.title,
            description: req.params.description
        };

        CategoryService.getCategory(getCate, function(err, resData){            
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
    }

    const searchCategory = async(req, res) =>{
       var search = req.body.search
        CategoryService.findCategory(search, function(err, resData){
            if(err){
                return res.send({
                    message: "Seach Category failse",
                    errors: err,
                    status: false,
                }).status(400)
            }
            res.send({
                message: "Search succsess",
                data: resData,
                status: true
            })
        })
    }

    module.exports = {
        postCreateCategory,updateCategory,deleteCategory,getCategory,searchCategory
    }