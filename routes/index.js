const router = require('express').Router();
const userRouter = require('./userRouter');
const postRouter = require('./postRuter');
const authRouter = require('./loginRouter');
const uploadRouter = require('./uploadRouter');

router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/auth", authRouter);
router.use("/test", uploadRouter);;

module.exports = router;