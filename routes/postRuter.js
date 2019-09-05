const router = require('express').Router();
const postController = require('./../controllers/postController');
const auth = require('./../middleware/auth');

router.put('/updatePost/:id', auth, postController.UpdatePost);
router.get('/show', postController.showAllPost);
router.delete('/delete', auth, postController.deletePost);


module.exports = router;

