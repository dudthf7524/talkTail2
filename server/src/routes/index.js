const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 예시로 간단히 작성한 라우팅
router.use('/users', userController.createUser);

module.exports = router;
