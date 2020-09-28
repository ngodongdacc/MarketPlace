const express = require('express');
const router = express.Router();

const commentCtr = require("../Controllers/CommentController");


router.post('/comment/recomment', commentCtr.reComment_Parent_ForCommentPost);
router.get('/comment/recomment', commentCtr.reComment_Parent_ForCommentPost);
router.get('/comment/comment-foruser/:id', commentCtr.getListComments);
router.post('/comment/:id', commentCtr.postComment);
// router.post('/add', commentCtr.postCart);
// router.post('/update', commentCtr.postCart);
// router.post('/delete', commentCtr.deleteCart);
// router.post('/delete-quantity', commentCtr.delete_Quantity_OfCart);
// router.get('/deleteAllProduct/:id', commentCtr.delete_All_ForUser);
// router.get('/get', cartCtr.getCart);
// router.get('/', cartCtr.showCartForUser);
// router.post('/search', cartCtr.searchCart);
module.exports = router