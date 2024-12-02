const express = require('express');
const multer = require('multer');
const { uploadMultipleImages } = require('../services/imgService');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.fields([
  { name: 'main', maxCount: 1 },
  { name: 'sub', maxCount: 10 },
  { name: 'album', maxCount: 10 },
  { name: 'review', maxCount: 10 },
  { name: 'pricing', maxCount: 10 }
]), async (req, res) => {
    try {
        const files = req.files;
        if (!files || Object.keys(files).length === 0) {
            return res.status(400).send('No files uploaded.');
        }

        const fileArray = [];
        Object.keys(files).forEach(key => {
            fileArray.push(...files[key]);
        });

        const results = await uploadMultipleImages(fileArray);
        res.status(200).send({ message: 'Files uploaded successfully', files: results });
    } catch (error) {
        console.error('Error uploading files:', error.message);
        res.status(500).send('Error uploading files');
    }
});

module.exports = router;
