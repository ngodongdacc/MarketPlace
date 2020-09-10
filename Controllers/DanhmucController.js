
const DanhMuc = require("../Model/Danhmuc");
const DanhMucService = require("../Services/DanhMucService");

const postDanhMUc = (req,res) => {
    // return res.send("ok")
    var newDanhMuc = new DanhMuc({
        title: req.body.title,
        des: req.body.des
    });

    DanhMucService.taoDanhMuc(newDanhMuc,function (err,resData) {


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
    })
}

module.exports = {
    postDanhMUc
}