const router = require('express').Router();
const userController = require('./../controllers/userController');
const auth = require('../middleware/auth');

router.post('/create', userController.createUser);
router.post('/create/post', auth, userController.insertPost);
router.get('/show', userController.showAllUser);
router.get('/show/:id', auth, userController.userPostList);


module.exports =  router;