const Comment = require("../Model/comment");
const Products = require("../Model/product");
const async = require("async");
const CommentService = require("../Services/commentService");
const { success, error_500, error_400 } = require("../validator/errors");
module.exports = {
    postComment: async (req, res) => {
        const IdProduct = req.query.IdProduct;
        const Content = req.body.Content;
        if (!Content.length < 0) return error_400(res, "Vui lòng nhập nội dung bình luận", "Content");
        if (Content === "") return error_400(res, "Vui lòng nhập nội dung bình luận", "Content");
        const comments = new Comment({
            IdUser: req.body.IdUser,
            Content: req.body.Content,
            IdProduct: IdProduct
        })
        try {
            if (!IdProduct) return error_400(res, "Vui lòng nhập Id", "ID");
            Products.findById(IdProduct, (err, resFindProduct) => {
                if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                if (!resFindProduct) return error_400(res, "Không tìm thấy sản phẩm", "Errors");
                Comment.create(comments, (err, resCommentParent) => {
                    if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                    success(res, "Đã bình luận cho sản phẩm này", resCommentParent)
                })
            })
        } catch (e) {
            error_500(res, e)
        }

    },
    reComment_Parent_ForCommentPost: (req, res) => {
        const commentReq = req.body;
        console.log("heeloo: ", commentReq);
        const IdProduct = req.query.IdProduct;
        commentReq.IdProduct = IdProduct;
        commentReq.IdProduct = Date.now();;
        commentReq.UpDateAt = Date.now();;
        try {
            if (!IdProduct) return error_400(res, "Vui lòng nhập Id", "ID");
            Products.findById(IdProduct, (err, resFindProduct) => {
                if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                if (!resFindProduct) return error_400(res, "Không tìm thấy sản phẩm", "Errors");
                Comment.findById(commentReq.IdComment, (err, resFindCommentOfPostSupper) => {
                    if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                    if (!resFindCommentOfPostSupper) return error_400(res, "Không tìm thấy bình luận của sản phẩm", "Errors");
                    if (resFindCommentOfPostSupper) {

                        // let commentRecomments = {};
                        // commentRecomments = commentReq;
                        // commentRecomments.IdProduct = IdProduct;
                        // commentRecomments.NewDateAt= Date.now();;
                        // commentRecomments.UpDateAt= Date.now();;
                        resFindCommentOfPostSupper.Reply.push(
                            commentReq
                        );
                        Comment.findByIdAndUpdate(resFindCommentOfPostSupper._id, { $set: resFindCommentOfPostSupper }, { new: true })
                            .exec((e, u) => {
                                if (e) error_500(res, e)
                                success(res, "Đã cập nhật câu trả lời cho bình luận này", u)
                            })
                    }
                });


            })
        } catch (e) {
            error_500(res, e)
        }

    },


    getListComments: async (req, res) => {
        var getCart = new Comment(req.params);
        CommentService.get_List_Comment_AllPost(getCart, (err, resData) => {
            if (err) {
                return res.send({
                    message: "get Cart failse",
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
    },
    get_List_CommentForPost: async (req, res) => {
        var id = req.params.id;
        Comment.findById(id, (err, resData) => {
            if (err) {
                return res.send({
                    message: "get Comment failse",
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
}