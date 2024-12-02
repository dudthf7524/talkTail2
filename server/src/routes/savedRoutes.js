const express = require('express');
const router = express.Router();
const savedController = require('../controllers/savedController');
const authMiddleware = require('../middleware/authMiddleware');

router.use('/', authMiddleware, savedController);

module.exports = router;