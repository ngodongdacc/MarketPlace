const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    ListComments: {
        type: Array, default: []
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId, required: true
    },
    CommentPostID: { type: String },
    CommentParentId: { type: Number, default: 0 },
    CommentPuthor: { type: Number },
    CommentAuthorEmail: { type: String },
    CommentAuthorUrl: { type: String },
    CommentAuthorIP: { type: String },
    CommentCreateDate: { type: Date, default: Date.now }, // ngày tạo 
    CommentUpdateDate: { type: Date, default: Date.now }, // ngày cập nhật
    CommentContent: { type: String },
    CommentKarma: { type: String },
    CommentApproved: { type: String },
    CommentAgent: { type: String },
    CommentType: { type: Number },
    CommentLike: { type: Number, default: 0 },
    CommentDisLike: { type: Number, default: 0 },
    // cookieId: { type: String, default:"" },
    Status: { type: Number, default: true },
    Des: { type: String, default: "" },
    Title: { type: String },

}, {
    timestamps: true
});
module.exports = mongoose.model("Comments", CommentSchema)