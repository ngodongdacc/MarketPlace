const Comment = require("../../Model/comment");
const Products = require("../../Model/product");
const Users = require("../../Model/users");
const async = require("async");
const { mongo, Mongoose } = require("mongoose");
const mongoose = require("mongoose");
const CommentService = require("../../Services/commentService");
const { success, error_500, error_400 } = require("../../validator/errors");
module.exports = {
    postComment: async (req, res) => {
        const IdProduct = req.body.IdProduct;
        const Content = req.body.Content;
        let IdUser = req.user._id;
        if (!IdUser)
            return error_400(res, "Vui lòng đăng nhập", "Login");
        if (!Content.length < 0) return error_400(res, "Vui lòng nhập nội dung bình luận", "Content");
        if (Content === "") return error_400(res, "Vui lòng nhập nội dung bình luận", "Content");
        const comments = new Comment({
            IdUser: IdUser,
            Content: Content,
            IdProduct: IdProduct
        })
        try {
            if (!IdProduct) return error_400(res, "Vui lòng nhập Id", "ID");
            Products.findById(IdProduct, (err, resFindProduct) => {
                if (err) return error_500(res, err)
                if (!resFindProduct) return error_400(res, "Không tìm thấy sản phẩm", "IdProduct");
                Users.findById(IdUser, (err, resFindUser) => {
                    if (err) return error_500(res, err)
                    if (!resFindUser) return error_400(res, "Tài khoản không tồn tại trong hệ thống", "IdUser");
                    Comment.create(comments, (err, resCommentParent) => {
                        if (err) return error_500(res, err)
                        CommentService.listComments(IdProduct, (err, resListData) => {
                            success(res, "Đã trả lời cho sản phẩm này",
                                {
                                    comment: resListData[0],
                                    count: resListData[1],
                                })
                        })

                    })
                })

            })
        } catch (e) {
            error_500(res, e)
        }
    },
    reComment_Parent_ForCommentPost: (req, res) => {
        const commentReq = req.body;
        const IdProduct = req.body.IdProduct;
        commentReq.IdProduct = IdProduct;
        var NewDateAt = new Date();
        var UpDateAt = new Date();
        commentReq.NewDateAt = NewDateAt
        commentReq.UpDateAt = UpDateAt
        let IdUser = req.user._id;
        if (!IdUser)
            return error_400(res, "Vui lòng đăng nhập", "Login");
        if (!commentReq.Content.length < 0) return error_400(res, "Vui lòng nhập nội dung bình luận", "Content");
        if (commentReq.Content === "") return error_400(res, "Vui lòng nhập nội dung bình luận", "Content");
        try {
            if (!IdProduct) return error_400(res, "Vui lòng nhập Id", "IdProduct");
            Products.findById(IdProduct, (err, resFindProduct) => {
                if (err) return error_500(res, err)
                if (!resFindProduct) return error_400(res, "Không tìm thấy sản phẩm", "IdProduct");
                Users.findById(IdUser, (err, resFindUser) => {
                    if (err) return error_500(res, err)
                    if (!resFindUser) return error_400(res, "Tài khoản không tồn tại trong hệ thống", "IdUser");
                    Comment.findById(commentReq.IdComment, (err, resFindCommentOfPostSupper) => {
                        if (err) return error_500(res, err)
                        if (!resFindCommentOfPostSupper) return error_400(res, "Không tìm thấy bình luận của sản phẩm", "Errors");
                        if (resFindCommentOfPostSupper) {
                            commentReq.IdComment = new mongoose.Types.ObjectId;
                            resFindCommentOfPostSupper.Reply.push(
                                commentReq
                            );
                            Comment.findByIdAndUpdate(resFindCommentOfPostSupper._id, { $set: resFindCommentOfPostSupper }, { new: true })
                                .exec((e, u) => {
                                    if (e) error_500(res, e)
                                    CommentService.listComments(IdProduct, (err, resListData) => {
                                        success(res, "Đã cập nhật câu trả lời cho bình luận này",
                                            {
                                                comment: resListData[0],
                                                count: resListData[1],
                                            })
                                    })
                                })
                        }
                    });
                })

            })
        } catch (e) {
            error_500(res, e)
        }
    },
    updateComment_Parent: async (req, res) => {
        const commentReq = req.body;
        var UpDateAt = new Date();
        let IdUser = req.user._id;
        if (!IdUser)
            return error_400(res, "Vui lòng đăng nhập", "Login");
        if (!commentReq.Content.length < 0) return error_400(res, "Vui lòng nhập nội dung bình luận", "Content");
        if (commentReq.Content === "") return error_400(res, "Vui lòng nhập nội dung bình luận", "Content");
        try {
            if (!commentReq.IdProduct) return error_400(res, "Vui lòng nhập Id", "IdProduct");
                Users.findById(IdUser, (err, resFindUser) => {
                    if (err) return error_500(res, err)
                    if (!resFindUser) return error_400(res, "Tài khoản không tồn tại trong hệ thống", "IdUser");
                    Comment.findById(commentReq.IdComment, (err, resFindData) => {
                        if (err) return error_500(res, err)
                        if (!resFindData) return error_400(res, "Không tìm thấy bình luận của sản phẩm", "IdComment");
                        Comment.findByIdAndUpdate(resFindData._id, {
                            UpDateAt: UpDateAt,
                            Content: commentReq.Content
                        }, { new: true })
                            .exec((e, u) => {
                                if (e) error_500(res, e)
                                CommentService.listComments(commentReq.IdProduct, (err, resListData) => {
                                    success(res, "Đã cập nhật câu trả lời mới",
                                        {
                                            comment: resListData[0],
                                            count: resListData[1],
                                        })
                                })
                            })

                    });
                })
   
        } catch (e) {
            error_500(res, e)
        }

    }
    ,
    updateComment_Super: async (req, res) => {
        const commentReq = req.body;
        var UpDateAt = new Date();
        let IdUser = req.user._id;
        if (!IdUser)
            return error_400(res, "Vui lòng đăng nhập", "Login");
        if (!commentReq.Content.length < 0) return error_400(res, "Vui lòng nhập nội dung bình luận", "Content");
        if (commentReq.Content === "") return error_400(res, "Vui lòng nhập nội dung bình luận", "Content");
        try {
            if (!commentReq.IdProduct) return error_400(res, "Vui lòng nhập Id", "IdProduct");
                Users.findById(IdUser, (err, resFindUser) => {
                    if (err) return error_500(res, err)
                    if (!resFindUser) return error_400(res, "Tài khoản không tồn tại trong hệ thống", "IdUser");
                    Comment.findById(commentReq.IdComment, (err, resFindData) => {
                        if (err) return error_500(res, err)
                        if (!resFindData) return error_400(res, "Không tìm thấy bình luận của sản phẩm", "IdComment");
                        const itemIndex = resFindData.Reply.findIndex(cmt => cmt.IdComment == commentReq.IdCommentSuper);
                        if (itemIndex > -1) {
                            resFindData.Reply[itemIndex].UpDateAt = UpDateAt;
                            resFindData.Reply[itemIndex].Content = commentReq.Content;
                            Comment.findByIdAndUpdate(resFindData._id, {
                                Reply: resFindData.Reply
                            }, { new: true })
                                .exec((e, u) => {
                                    if (e) error_500(res, e)
                                    CommentService.listComments(commentReq.IdProduct, (err, resListData) => {
                                        success(res, "Đã cập nhật câu trả lời mới",
                                            {
                                                comment: resListData[0],
                                                count: resListData[1],
                                            })
                                    })
                                  
                                })
                        } else {
                            error_400(res, "Không tìm thấy bình luận của sản phẩm", "IdCommentSuper");
                        }
                    });
                })

      
        } catch (e) {
            error_500(res, e)
        }
    },
    deleteComment_Parent: async (req, res) => {
        const IdProduct = req.body.IdProduct;
        const IdComment = req.body.IdComment;
        let IdUser = req.user._id;
        if (!IdUser)
            return error_400(res, "Vui lòng đăng nhập", "Login");
        try {
            if (!IdProduct) return error_400(res, "Vui lòng nhập Id", "IdProduct");
                Users.findById(IdUser, (err, resFindUser) => {
                    if (err) return error_500(res, err)
                    if (!resFindUser) return error_400(res, "Tài khoản không tồn tại trong hệ thống", "IdUser");
                    Comment.findById(IdComment, (err, resFindData) => {
                        if (err) return error_500(res, err)
                        if (!resFindData) return error_400(res, "Không tìm thấy bình luận của sản phẩm", "IdComment");
                        Comment.findByIdAndDelete(resFindData._id, (err, resFindComment) => {
                            if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                            if (!resFindComment) return error_400(res, "Không tìm thấy bình luận của sản phẩm", "IdComment");
                            CommentService.listComments(IdProduct, (err, resListData) => {
                                success(res, "Đã xóa bình luận này",
                                    {
                                        comment: resListData[0],
                                        count: resListData[1],
                                    })
                            })
                           
                        });
                    })
                })
         
        } catch (e) {
            error_500(res, e)
        }
    }
    ,
    deleteComment_Super: async (req, res) => {
        const IdProduct = req.body.IdProduct;
        const IdCommentParent = req.body.IdCommentParent;
        const IdCommentSup = req.body.IdCommentSup;
        let IdUser = req.user._id;
        if (!IdUser)
            return error_400(res, "Vui lòng đăng nhập", "Login");
        try {
            if (!IdProduct) return error_400(res, "Vui lòng nhập Id", "IdProduct");
                Users.findById(IdUser, (err, resFindUser) => {
                    if (err) return error_500(res, err)
                    if (!resFindUser) return error_400(res, "Tài khoản không tồn tại trong hệ thống", "IdUser");
                    Comment.findById(IdCommentParent, (err, resFindComment) => {
                        if (err) return error_500(res, err)
                        if (!resFindComment) return error_400(res, "Không tìm thấy bình luận này", "Errors");
                        const itemIndex = resFindComment.Reply.findIndex(cmt => cmt.IdComment == IdCommentSup);
                        if (itemIndex > -1) {
                            resFindComment.Reply.findIndex(cmt => cmt.IdComment == IdCommentSup) !== -1 && resFindComment.Reply.splice(resFindComment.Reply.findIndex(cmt => cmt.IdComment == IdCommentSup), 1)
                            Comment.findByIdAndUpdate(resFindComment._id, resFindComment, (err, resRemove) => {
                                if (err) return error_500(res, err)
                                CommentService.listComments(IdProduct, (err, resListData) => {
                                    success(res, "Đã xóa bình luận này",
                                        {
                                            comment: resListData[0],
                                            count: resListData[1],
                                        })
                                })
                            })
                        } else {
                            error_400(res, "Bình luận này không còn tồn tại", "Errors");
                        }

                    });
                })
       
        } catch (e) {
            error_500(res, e)
        }
    }
    ,
    get_Comment_Detail: async (req, res) => {
        try {

            IdProduct = req.query.IdProduct
            IdComment = req.query.IdComment
            if (!IdProduct) return error_400(res, "Vui lòng nhập Id", "IdProduct");
            Products.findById(IdProduct, (err, resFindProduct) => {
                if (err) return error_500(res, err)
                if (!resFindProduct) return error_400(res, "Không tìm thấy sản phẩm", "IdProduct");
                const query = {
                    IdComment: new mongoose.mongo.ObjectId(IdComment)
                }
                async.parallel([
                    (cb) =>
                        Comment.findById(IdComment)
                            .sort({ NewDateAt: "desc" })
                            .exec((e, resDataSearch) => e ? cb(e) : cb(null, resDataSearch)),
                    (cb) => Comment.count(query)
                        .exec((e, resDataSearch) => e ? cb(e) : cb(null, resDataSearch))
                ], (err, results) => {
                    if (err) return error_500(res, err)
                    res.json({
                        message: "Lấy danh sách bình luận thành công",
                        data: {
                            comment: results[0],
                            count: results[1],
                        },
                        status: true
                    })
                })
            })

        } catch (e) {
            error_500(res, e);
        }
    },

    // Lấy danh sách comment của sản phẩm
    getListCommentForProduct: async (req, res) => {
        try {
            const config = {};
            config.IdProduct = req.query.IdProduct
            config.page = req.query.page ? Number(req.query.page) : 1
            config.limit = req.query.limit ? Number(req.query.limit) : 20
            config.skip = (config.page - 1) * config.limit;
            if (!mongoose.Types.ObjectId.isValid(config.IdProduct))
                return error_400(res, "Vui lòng nhập id dạng ObjectId", "IdProduct");
            if (!config.IdProduct)
                return error_400(res, "Vui lòng nhập Id", "IdProduct");

            Products.findById(config.IdProduct, (err, resFindProduct) => {
                if (err) return error_500(res, err);

                if (!resFindProduct)
                    return error_400(res, "Không tìm thấy sản phẩm", "Errors");

                const query = {
                    IdProduct: new mongoose.mongo.ObjectId(config.IdProduct)
                }

                async.parallel([
                    (cb) =>
                        Comment.aggregate([
                            { $match: query },
                            {
                                $lookup: // user
                                {
                                    from: "users",
                                    localField: "IdUser",
                                    foreignField: "_id",
                                    as: "UserName",
                                },
                            }])
                            .skip(config.skip)
                            .limit(config.limit)
                            .sort({ NewDateAt: "desc" })
                            .exec((e, resData) => e ? cb(e) : cb(null, resData)),

                    (cb) => Comment.countDocuments(query)
                        .exec((e, count) => e ? cb(e) : cb(null, count))

                ], (err, results) => {
                    if (err) return error_500(res, err);
                    async.waterfall([
                        cb => {
                            results[0] = results[0].map(el => {
                                if (el.UserName && el.UserName[0]
                                    && el.UserName[0].FullName)
                                    el.UserName = el.UserName[0].FullName

                                else el.UserName = "Khách hàng";
                                return el
                            })
                            cb(null, results)
                        }
                    ], (e, results) => {
                        if (e) error_500(res, e)

                        success(res, "Lấy danh sách bình luận thành công",
                            {
                                comment: results[0],
                                count: results[1],
                            })
                    })
                })
            })

        } catch (e) {
            error_500(res, e);
        }

    }
}