const express = require('express');
const imgController = require('../controllers/imgController');

const router = express.Router();

router.use('/img', imgController);

module.exports = router;
