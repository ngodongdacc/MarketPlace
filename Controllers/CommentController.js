const Comment = require("../Model/comment");
const async = require("async");
const CommentService = require("../Services/commentService");
module.exports = {
    postComment: (req, res) => {
        const commentReq = req.body;
        // const comments=[];
        const id = commentReq.id;
        // const id = req.params.id;
        try {
            console.log("hê1", id);
            if (!id) return res.status(400).json({ message: "Vui lòng nhập Id", status: false })
            Comment.findById(id, (err, resFindCommentOfPost) => {
                if (err) return res.status(400).json({ message: "Đã có lỗi xảy ra trong quá trình xử lý", errors: err, status: false });
                if (!resFindCommentOfPost) return res.json({ message: "Không tìm thấy bài đăng của sản phẩm", data: null, status: false });
                if (resFindCommentOfPost) {
                    Comment.create(commentReq, (err, resCommentParent) => {
                        if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                        res.json({
                            message: "Tạo đơn hàng thành công !",
                            data: resCommentParent,
                            status: true
                        })
                    })

                }
            });
        } catch (e) {
            res.send({
                message: e.message,
                errors: e.errors,
                code: 0
            }).status(500) && next(e)
        }

    },
    reComment_Parent_ForCommentPost: (req, res) => {
        const commentReq = req.body;
        console.log("heeloo: ", commentReq);
        const id = commentReq.id;
        try {
            if (!id) return res.status(400).json({ message: "Vui lòng nhập Id", status: false })
            Comment.findById(id, (err, resFindCommentOfPostSupper) => {
                if (err) return res.status(400).json({ message: "Đã có lỗi xảy ra trong quá trình xử lý", errors: err, status: false });
                if (!resFindCommentOfPostSupper) return res.json({ message: "Không tìm thấy bài đăng của sản phẩm", data: null, status: false });
                if (resFindCommentOfPostSupper) {
                    console.log("parent_id",commentReq.CommentParentId);
                    if (resFindCommentOfPostSupper.CommentParentId==0 &&commentReq.CommentParentId == 1) {
                        let commentRecomments = {};
                        commentRecomments=commentReq;
                        console.log("parent_id",commentReq.CommentParentId);
                        resFindCommentOfPostSupper.ListComments.push(
                            commentRecomments
                        );
                        Comment.findByIdAndUpdate(resFindCommentOfPostSupper._id,resFindCommentOfPostSupper, (err, resData) => {
                         
                            if (err) return res.status(400).json({ message: "Có lỗi trong quá trình xử lý", errors: err, status: false });
                            res.json({
                                message: "Tạo đơn hàng thành công !",
                                data: resData,
                                status: true
                            })
                        })

                    }
                    // const itemIndex = await resFindCommentOfPost.ListComments.findIndex(lc => lc.UserId == ProductId);
                }
            });
        } catch (e) {
            res.send({
                message: e.message,
                errors: e.errors,
                code: 0
            }).status(500) && next(e)
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