const router = require('express').Router();
const postController = require('./../controllers/postController');


router.put('/updatePost/:id', postController.UpdatePost);
router.get('/show', postController.showAllPost);
router.delete('/delete/:id', postController.deletePost);


module.exports = router;

