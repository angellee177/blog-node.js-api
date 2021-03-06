const router = require('express').Router();
const userController = require('./../controllers/userController');
const auth = require('../middleware/auth');

router.post('/create', userController.createUser);
router.post('/create/post', auth, userController.insertPost);
router.get('/', userController.showAllUser);
router.get('/postList', auth, userController.userPostList);
router.delete('/delete', auth, userController.deleteUser);

module.exports =  router;