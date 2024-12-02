const express = require('express');
const petController = require('../controllers/petController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

//router.use('/pet', petController);
router.get('/pet-species', petController.getAllPetSpeciesHandler);
router.get('/auto-complete/species', petController.getAllPetSpeciesHandler);
router.get('/auto-complete/breeds', petController.getAllPetBreedsHandler);
router.get('/pet-details', petController.getPetDetailsBySpeciesHandler);
router.get ('/pet-options', petController.getPetOptionsHandler);
router.post('/register-pet', upload.single('image'), authMiddleware, petController.registerPetHandler);
router.get('/my-pets', authMiddleware, petController.getMyPetsHandler);
router.get('/:id', authMiddleware, petController.getPetDetailsHandler);

module.exports = router;