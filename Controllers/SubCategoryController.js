const SubCategories = require("../Model/subcategory");
const SubCategoryService = require("../Services/subcategoryService");
const { updateOne, model } = require("../Model/subcategory");

const createSubCategory = async(req, res) => {
    var newSubCategory = new SubCategories({
        title: req.body.title,
        name: req.body.name,
    });
    SubCategoryService.createSubCategory(newSubCategory, function(err, resData){
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
            message: "create succsess",
            data: resData
        })
    });
}

const updateSubCategory = async(req, res) => {
    var updateSubCate = {
        _id: req.body.id,
        title: req.body.title,
        name: req.body.name
    };
    SubCategoryService.updateSubCategory(updateSubCate, function(err, resData){
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

const deleteSubCategory = async(req, res) => {
    var deleteSubCate = {
        _id: req.body.id,
        title: req.body.title,
        name: req.body.name
    };
    SubCategoryService.deleteSubCategory(deleteSubCate, function(err, resData){
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

const getSubCategory = async(req, res) => {
    var getSubCate = {
        _id: req.params.id,
        title: req.params.title,
        name: req.params.name
    };

    SubCategoryService.getSubCategory(getSubCate, function(err, resData){            
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

module.exports = {
    createSubCategory,updateSubCategory,deleteSubCategory,getSubCategory
}