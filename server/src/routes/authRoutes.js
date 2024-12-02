const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); 

const router = express.Router();

router.use('/auth', authController);
router.use('/user', userController);

// 보호된 프로필 라우트 정의
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: '보호된 프로필 라우트', user: req.user });
});

router.get('/verify-token', authMiddleware, (req, res) => {
  res.status(200).json({ valid: true }); // 토큰이 유효하면 200 상태와 함께 응답
});

module.exports = router;