const express = require('express');
const router = express.Router();
const {checkSignIn} = require("../middleware/auth")
const commentCtr = require("../Controllers/CommentController");

router.post('/comment',checkSignIn(), commentCtr.postComment);
router.post('/recomment',checkSignIn(), commentCtr.reComment_Parent_ForCommentPost);
router.get('/comment-product', checkSignIn(),commentCtr.getListCommentForProduct);
router.get('/comment-details', checkSignIn(),commentCtr.get_Comment_Detail);
router.get('/delete-commentp', checkSignIn(),commentCtr.deleteComment_Parent);
router.get('/delete-comments', checkSignIn(),commentCtr.deleteComment_Super);
router.post('/update-commentp', checkSignIn(),commentCtr.updateComment_Parent);
router.post('/update-comments', checkSignIn(),commentCtr.updateComment_Super);
module.exports = router