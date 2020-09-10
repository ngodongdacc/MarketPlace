var DanhMuc = require("../Model/Danhmuc");

const taoDanhMuc = async (danhmuc,cb) => {
    try {    
        DanhMuc.create(danhmuc, cb);
    } catch(e) {
      throw e
    }
  }

const suaDanhMuc = async (danhmuc,cb) => {
    try {         
        DanhMuc.updateOne(danhmuc, cb);
    } catch(e) {
      throw e
    }
  }
const xoaDanhMuc = async (danhmuc,cb) => {
    try {         
        DanhMuc.deleteOne(danhmuc, cb);
    } catch(e) {
      throw e
    }
  }

module.exports = {
    taoDanhMuc
}