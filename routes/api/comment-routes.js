const router = require('express').Router();
const {addComment, removeComment} = require('../../controllers/comment-controller');
const commentRoutes = require('./comment-routes');
const pizzaRoutes = require('./pizza-routes');

//import methods
const {
    addComment,
    removeComment,
    addReply,
    removeReply
} = require('../../controllers/comment-controller');

router.use('/comments', commentRoutes);
router.use('/pizzas', pizzaRoutes);

//api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

//api/comments<pizzaId>/<commentId>
router.route('/:pizzaId/:commentId').delete(removeComment).put(addReply);

//remove reply
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

module.exports = router;