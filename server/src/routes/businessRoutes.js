const express = require('express');
const multer = require('multer');
const router = express.Router();
const dotenv = require('dotenv');
const authMiddleware = require('../middleware/authMiddleware');
const businessController = require('../controllers/businessController');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

dotenv.config();

router.get('/businesses', authMiddleware, businessController.getAllBusinesses);
router.get('/businesses/:id', authMiddleware, businessController.getBusinessById);
router.post('/businesses', upload.fields([
    { name: 'main', maxCount: 1 },
    { name: 'sub', maxCount: 50 },
    { name: 'album', maxCount: 50 },
    { name: 'review', maxCount: 50 },
    { name: 'pricing', maxCount: 10 }
]), businessController.createBusiness);

module.exports = router;