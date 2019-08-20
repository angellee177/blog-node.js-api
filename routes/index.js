const router = require('express').Router();
const userRouter = require('./userRouter');
const postRouter = require('./postRuter');
const authRouter = require('./loginRouter');

router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/auth", authRouter);

module.exports = router;