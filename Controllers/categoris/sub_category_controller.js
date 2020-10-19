const SubCategorys = require("../../Model/subcategory");

const createSubCategory = async(req, res) => {
    var newSubCategory = new SubCategorys({
        Title: req.body.Title,
        Name: req.body.Name,
        IdCategory: req.body.IdCategory,
    });
    SubCategorys.create(newSubCategory, function(err, resData){
        if(err){
            return res.send({
                message: "Có lỗi trong quá trình xử lý",
                errors: err,
                status: false,
              }).status(400)
        }
        res.json({
            message: "Tạo mới danh mục con thành công",
            data: resData,
            status: true
        })
    });
}

const updateSubCategory = async(req, res) => {
    var updateSubCate = {
        Id: req.body.Id,
        Title: req.body.Title,
        Name: req.body.Name
    };

    if(!updateSubCate.Id) return res.json({message: "Vui lòng nhập Id", status: false}).status(400);
    if(updateSubCate.Title == "") return res.json({message: "Title không được rỗng", status: false}).status(400);
    if(updateSubCate.Name == "") return res.json({message: "Name không được rỗng", status: false}).status(400);

    SubCategorys.findById(updateSubCate.Id, (err, resCate) =>{
        if(err){
            return res.json({
                message: "Có lỗi trong quá trình xử lý",
                errors: err,
                status: false,
            }).status(400)
        }
        if(!resCate) return res.json({message: "Không tìm thấy id danh mục", status: false})
        
        SubCategorys
                    .findByIdAndUpdate(resCate._id,{$set: updateSubCate}, {new: true},)
                    .exec( (err, resUp) => {
                        if(err) res.json({
                            message: "Có lỗi trong quá trình xử lý",
                            errors: err,
                            status: false,
                        }).status(400);

                        res.send({
                            message: "Cập nhật danh mục thành công!",
                            data: resUp,
                            status: true
                        })
                    })
        
    });

}

const deleteSubCategory = async(req, res) => {
    if(!req.body.Id) return res.json({ message: "Vui lòng nhập Id",status: false,}).status(400)

    SubCategorys.findById(req.body.Id,(err, resSub) => {
        if(err) return res.send({ message: "Có lỗi trong quá trình xử lý",errors: err,status: false,}).status(400)
        if(!resSub) return res.send({ message: "Không tìm thấy danh mục",status: false,}).status(400);

        SubCategorys.findByIdAndDelete(resSub._id,(err,resDel) => {
            res.json({
                message: "Xóa danh mục thành công",
                data: resDel,
                status: true
            })
        })

    })
}

const getSubCategory = async(req, res) => {

    SubCategorys.find({}, (err, resData) =>{            
     if(err) return res.json({
                message: "Có lỗi trong quá trình xử lý",
                errors: err,
                status: false,
            }).status(400)
        
        res.send({
            message: "Lấy danh sách danh mục thành công",
            data: resData,
            status: true
        })
    })
}

module.exports = {
    createSubCategory,updateSubCategory,deleteSubCategory,getSubCategory
}