const router = require('express').Router();
const userController = require('./../controllers/userController');

router.post("/login", userController.loginUser);
router.get("/currentUser", userController.current_user);
module.exports = router;
