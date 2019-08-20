const router = require('express').Router();
const postController = require('./../controllers/postController');
const auth = require('./../middleware/auth');

router.put('/updatePost/:id', postController.UpdatePost);
router.get('/show', auth, postController.showAllPost);
router.delete('/delete/:id', postController.deletePost);


module.exports = router;

