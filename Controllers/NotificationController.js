const Comment = require("../Model/comment");
const Products = require("../Model/product");
const Users = require("../Model/users");
const async = require("async");
const { mongo, Mongoose } = require("mongoose");
const mongoose = require("mongoose");
const CommentService = require("../Services/commentService");
const { success, error_500, error_400 } = require("../validator/errors");
module.exports = {
    postComment: async (req, res) => {
        const IdProduct = req.query.IdProduct;
        const Content = req.body.Content;
        const IdUser = req.body.IdUser;
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
                if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                if (!resFindProduct) return error_400(res, "Không tìm thấy sản phẩm", "IdProduct");
                Users.findById(IdUser, (err, resFindUser) => {
                    if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                    if (!resFindUser) return error_400(res, "Tài khoản không tồn tại trong hệ thống", "IdUser");
                    Comment.create(comments, (err, resCommentParent) => {
                        if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                        success(res, "Đã bình luận cho sản phẩm này", resCommentParent)
                    })
                })

            })
        } catch (e) {
            error_500(res, e)
        }
    },
    reComment_Parent_ForCommentPost: (req, res) => {
        const commentReq = req.body;
        const IdProduct = req.query.IdProduct;
        commentReq.IdProduct = IdProduct;
        var NewDateAt = new Date();
        var UpDateAt = new Date();
        commentReq.NewDateAt = NewDateAt
        commentReq.UpDateAt = UpDateAt
        if (!commentReq.Content.length < 0) return error_400(res, "Vui lòng nhập nội dung bình luận", "Content");
        if (commentReq.Content === "") return error_400(res, "Vui lòng nhập nội dung bình luận", "Content");
        try {
            if (!IdProduct) return error_400(res, "Vui lòng nhập Id", "IdProduct");
            Products.findById(IdProduct, (err, resFindProduct) => {
                if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                if (!resFindProduct) return error_400(res, "Không tìm thấy sản phẩm", "Errors");
                Users.findById(commentReq.IdUser, (err, resFindUser) => {
                    if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                    if (!resFindUser) return error_400(res, "Tài khoản không tồn tại trong hệ thống", "IdUser");
                    Comment.findById(commentReq.IdComment, (err, resFindCommentOfPostSupper) => {
                        if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                        if (!resFindCommentOfPostSupper) return error_400(res, "Không tìm thấy bình luận của sản phẩm", "Errors");
                        if (resFindCommentOfPostSupper) {
                            commentReq.IdComment = new mongoose.Types.ObjectId;
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

            })
        } catch (e) {
            error_500(res, e)
        }
    },
    updateComment_Parent: async (req, res) => {
        const commentReq = req.query;
        var UpDateAt = new Date();
        if (!commentReq.Content.length < 0) return error_400(res, "Vui lòng nhập nội dung bình luận", "Content");
        if (commentReq.Content === "") return error_400(res, "Vui lòng nhập nội dung bình luận", "Content");
        try {
            if (!commentReq.IdProduct) return error_400(res, "Vui lòng nhập Id", "IdProduct");
            Products.findById(commentReq.IdProduct, (err, resFindProduct) => {
                if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                if (!resFindProduct) return error_400(res, "Không tìm thấy sản phẩm", "Errors");
                Users.findById(commentReq.IdUser, (err, resFindUser) => {
                    if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                    if (!resFindUser) return error_400(res, "Tài khoản không tồn tại trong hệ thống", "IdUser");
                    Comment.findById(commentReq.IdComment, (err, resFindData) => {
                        if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                        if (!resFindData) return error_400(res, "Không tìm thấy bình luận của sản phẩm", "Errors");
                        Comment.findByIdAndUpdate(resFindData._id, {
                            UpDateAt: UpDateAt,
                            Content: commentReq.Content
                        }, { new: true })
                            .exec((e, u) => {
                                if (e) error_500(res, e)
                                success(res, "Đã câu trả lời mới", u)
                            })

                    });
                })
            })
        } catch (e) {
            error_500(res, e)
        }

    }
    ,
    updateComment_Super: async (req, res) => {
        const commentReq = req.query;
        var UpDateAt = new Date();
        if (!commentReq.Content.length < 0) return error_400(res, "Vui lòng nhập nội dung bình luận", "Content");
        if (commentReq.Content === "") return error_400(res, "Vui lòng nhập nội dung bình luận", "Content");
        try {
            if (!commentReq.IdProduct) return error_400(res, "Vui lòng nhập Id", "IdProduct");
            Products.findById(commentReq.IdProduct, (err, resFindProduct) => {
                if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                if (!resFindProduct) return error_400(res, "Không tìm thấy sản phẩm", "Errors");
                Users.findById(commentReq.IdUser, (err, resFindUser) => {
                    if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                    if (!resFindUser) return error_400(res, "Tài khoản không tồn tại trong hệ thống", "IdUser");
                    Comment.findById(commentReq.IdComment, (err, resFindData) => {
                        if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                        if (!resFindData) return error_400(res, "Không tìm thấy bình luận của sản phẩm", "Errors");
                        const itemIndex = resFindData.Reply.findIndex(cmt => cmt.IdComment == commentReq.IdCommentSupper);
                        if (itemIndex > -1) {
                            resFindData.Reply[itemIndex].UpDateAt = UpDateAt;
                            resFindData.Reply[itemIndex].Content = commentReq.Content;
                            Comment.findByIdAndUpdate(resFindData._id, {
                                Reply: resFindData.Reply
                            }, { new: true })
                                .exec((e, u) => {
                                    if (e) error_500(res, e)
                                    success(res, "Đã câu trả lời mới", u)
                                })
                        } else {
                            error_400(res, "Không tìm thấy bình luận của sản phẩm", "IdCommentSupper");
                        }
                    });
                })

            })
        } catch (e) {
            error_500(res, e)
        }
    },
    deleteComment_Parent: async (req, res) => {
        const IdProduct = req.query.IdProduct;
        const IdComment = req.query.IdComment;
        try {
            if (!IdProduct) return error_400(res, "Vui lòng nhập Id", "IdProduct");
            Products.findById(IdProduct, (err, resFindProduct) => {
                if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                if (!resFindProduct) return error_400(res, "Không tìm thấy bình luận này", "Errors");
                Comment.findById(IdComment, (err, resFindData) => {
                    if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                    if (!resFindData) return error_400(res, "Không tìm thấy bình luận của sản phẩm", "Errors");
                    Comment.findByIdAndDelete(resFindData._id, (err, resFindComment) => {
                        if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                        if (!resFindComment) return error_400(res, "Không tìm thấy bình luận của sản phẩm", "Errors");
                        success(res, "Đã xóa câu trả lời cho bình luận này", resFindComment)
                    });
                })
                
            })
        } catch (e) {
            error_500(res, e)
        }
    }
    ,
    deleteComment_Super: async (req, res) => {
        const IdProduct = req.query.IdProduct;
        const IdCommentParent = req.query.IdCommentParent;
        const IdCommentSup = req.query.IdCommentSup;
        try {
            if (!IdProduct) return error_400(res, "Vui lòng nhập Id", "IdProduct");
            Products.findById(IdProduct, (err, resFindProduct) => {
                if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                if (!resFindProduct) return error_400(res, "Không tìm thấy sản phẩm", "Errors");
                Comment.findById(IdCommentParent, (err, resFindComment) => {
                    if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                    if (!resFindComment) return error_400(res, "Không tìm thấy bình luận này", "Errors");
                    const itemIndex = resFindComment.Reply.findIndex(cmt => cmt.IdComment == IdCommentSup);
                    if (itemIndex > -1) {
                        resFindComment.Reply.findIndex(cmt => cmt.IdComment == IdCommentSup) !== -1 && resFindComment.Reply.splice(resFindComment.Reply.findIndex(cmt => cmt.IdComment == IdCommentSup), 1)
                        Comment.findByIdAndUpdate(resFindComment._id, resFindComment, (err, resRemove) => {
                            if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                            success(res, "Bình luận này đã được xóa", resRemove)
                        })
                    }else{
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
                if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                if (!resFindProduct) return error_400(res, "Không tìm thấy sản phẩm", "Errors");
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
                    if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
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
            console.log(e)
            error_500(res, e);
        }
    },
    getListCommentForProduct: async (req, res) => {
        try {
            const config = {};
            config.IdProduct = req.query.IdProduct
            // config.search = req.query.search
            config.page = req.query.page ? Number(req.query.page) : 1
            config.limit = req.query.limit ? Number(req.query.limit) : 20
            config.skip = (config.page - 1) * config.limit;
            if (!config.IdProduct) return error_400(res, "Vui lòng nhập Id", "IdProduct");
            Products.findById(config.IdProduct, (err, resFindProduct) => {
                if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
                if (!resFindProduct) return error_400(res, "Không tìm thấy sản phẩm", "Errors");
                const query = {
                    IdProduct: new mongoose.mongo.ObjectId(config.IdProduct)
                }
                async.parallel([
                    (cb) =>
                        Comment.find(query)
                            .skip(config.skip)
                            .limit(config.limit)
                            .sort({ NewDateAt: "desc" })
                            .exec((e, resDataSearch) => e ? cb(e) : cb(null, resDataSearch)),
                    (cb) => Comment.count(query)
                        .exec((e, resDataSearch) => e ? cb(e) : cb(null, resDataSearch))
                ], (err, results) => {
                    if (err) return error_400(res, "Có lỗi trong quá trình xử lý", "Errors");
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
            console.log(e)
            error_500(res, e);
        }

    }
}