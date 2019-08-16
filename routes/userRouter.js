const router = require('express').Router();
const userController = require('./../controllers/userController');

router.post('/create', userController.createUser);
router.post('/create/post/:id', userController.insertPost);
router.get('/show', userController.showAllUser);
router.get('/show/:id', userController.userPostList);

module.exports =  router;