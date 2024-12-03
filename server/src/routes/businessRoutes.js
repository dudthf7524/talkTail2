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

router.post('/businesses', businessController.createBusiness);

router.post('/businesses-information', upload.fields([
    { name: 'main', maxCount: 1 },
    { name: 'pricing', maxCount: 3 }
]), businessController.createBusinessInformation);

module.exports = router;