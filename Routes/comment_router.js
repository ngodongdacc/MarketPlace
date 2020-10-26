const express = require('express');
const router = express.Router();
const {checkSignIn,checkRole} = require("../middleware/auth")
const commentCtr = require("../Controllers/products/comment_controller");

router.post('/comment',checkSignIn(),commentCtr.postComment);
router.post('/recomment',checkSignIn(),commentCtr.reComment_Parent_ForCommentPost);
router.get('/comment-product',commentCtr.getListCommentForProduct);
router.get('/comment-details',commentCtr.get_Comment_Detail);
router.post('/delete-commentp', checkSignIn(),checkRole(10073),commentCtr.deleteComment_Parent);
router.post('/delete-comments', checkSignIn(),checkRole(10077),commentCtr.deleteComment_Super);
router.post('/update-commentp', checkSignIn(),checkRole(10071),commentCtr.updateComment_Parent);
router.post('/update-comments', checkSignIn(),checkRole(10076),commentCtr.updateComment_Super);
module.exports = router