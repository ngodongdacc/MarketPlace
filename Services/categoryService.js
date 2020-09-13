var Categoris = require("../Model/category");
const bcrypt = require("bcryptjs");


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
        Categoris.updateOne({_id:category.id},{icon: category.icon ,title: category.title, description: category.description},cb);
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

const findOneCategory = async (search,cb) => {
    try {         
      Categoris.findOne({title: search},cb);
    } catch(e) {
      throw e
    }
}

const findOneCateById = async (id, cb) => {
      try{
          Categoris.findById(id, cb);
          }catch (e) {
              throw e
          }
}
const removeCateById = async (id,cb) => {
        try {         
          Categoris.findByIdAndRemove(id,cb);
        } catch(e) {
          throw e
        }
}

const searchCategory = async(search, cb) => {
    var objSearch = {}
    if(search.text)
    objSearch = {$text: {$search: search.text}}
    Categoris.find(objSearch)
            .skip(search.skip)
            .limit(search.limit)
            .sort({title: 'desc'})
            .exec(cb)
}

const countCategory = async (cb) => {
    Categoris.count({}, cb);
}
module.exports = {
    createCategory,updateCategory,deleteCategory,
    getCategory,findCategory,findOneCategory,findOneCateById,
    removeCateById,countCategory,searchCategory
}