const Tags = require("../Model/tags");
module.exports = {
    addTag :  function (req,res) {
        var newTag = {
            Title: req.body.Title,
            Des: req.body.Des,
        }

        Tags.create(newTag, function(err, resData){
            if(err) {
                return res.status(400).json({
                    message: "Có lỗi trong quá trình xử lý",
                    errors: err,
                    status: false
                })
            }

            return res.json({
                    message: "Thêm tag thành công",
                    data: {
                        Title: resData.Title,
                        Des: resData.Des
                    },
                    status: true
                })
        })
    },

    deleteTag : function (req,res){
        res.send("xóa tag")
    }

}