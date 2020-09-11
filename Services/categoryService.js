var Categoris = require("../Model/category");
const bcrypt = require("bcryptjs");
const category = require("../Model/category");

//  create category  

const createCategory = async(category, cb) => {
    try {    
        Categoris.create(category, cb);
    } catch(e) {
      throw e
    }
}

// update category
const updateCategory = async(category, cb) => {
    try {
        Categoris.updateOne({_id:category.id},{title: category.title, description: category.description},cb);
    }catch(e){
        throw e
    }
}


// delete category
const deleteCategory = async(category, cb) => {
    try{
        Categoris.deleteOne({_id: category.id},cb);
    }catch(e){
        throw e
    }
}


// read category
const getCategory = async(category, cb) => {
    try{
        Categoris.find({},cb)
    }catch(e){
        throw e
    }
}


//  search category

const findCategory = async(search,cb) => {
    try{
        Categoris.find({title: search},cb)
    }catch(e){
        throw e
    }
}
module.exports = {
    createCategory,updateCategory,deleteCategory,getCategory,findCategory
}