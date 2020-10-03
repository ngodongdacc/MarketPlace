const express = require('express');
const router = express.Router();
const {checkSignIn,checkRole} = require("../middleware/auth")
const commentCtr = require("../Controllers/CommentController");

router.post('/comment',checkSignIn(), checkRole(10070),commentCtr.postComment);
router.post('/recomment',checkSignIn(), checkRole(10074),commentCtr.reComment_Parent_ForCommentPost);
router.get('/comment-product', checkSignIn(),commentCtr.getListCommentForProduct);
router.get('/comment-details', checkSignIn(),commentCtr.get_Comment_Detail);
router.get('/delete-commentp', checkSignIn(),checkRole(10073),commentCtr.deleteComment_Parent);
router.get('/delete-comments', checkSignIn(),checkRole(10077),commentCtr.deleteComment_Super);
router.post('/update-commentp', checkSignIn(),checkRole(10071),commentCtr.updateComment_Parent);
router.post('/update-comments', checkSignIn(),checkRole(10076),commentCtr.updateComment_Super);
module.exports = router