var SubCategories = require("../Model/subcategory");
const bcrypt = require("bcryptjs");
const subcategory = require("../Model/subcategory");


// create subcategory 
const createSubCategory = async(subcategory,cb) => {
    try {    
        SubCategories.create(subcategory, cb);
    } catch(e) {
      throw e
    }
}

// update subcategory

 const updateSubCategory = async(subcategory,cb) => {
     try{
    SubCategories.updateOne({id: subcategory.id},{title: subcategory.title, name: subcategory.name},cb);
     }catch(e){
         throw e
     }
 }

//  delete subcategory

const deleteSubCategory = async(subcategory, cb) => {
    try{
        SubCategories.deleteOne({id: subcategory.id},cb);
    }catch(e){
        throw e
    }
}

// read subcategory
const getSubCategory = async(subcategory, cb) => {
    try{
        SubCategories.find({},cb)
    }catch(e){
        throw e
    }
}

module.exports = {
    createSubCategory,updateSubCategory,deleteSubCategory, getSubCategory
}
