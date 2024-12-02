const { v4: uuidv4 } = require('uuid');
const businessService = require('../services/businessService');
const imageService = require('../services/imgService');

const getAllBusinesses = async (req, res) => {
    try {
        const { category } = req.query;
        const businesses = await businessService.getBusinessesByCategory(category);
        console.log('businesses:', businesses);
        res.json(businesses);
    } catch (error) {
        console.error('Error fetching businesses:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const getBusinessById = async (req, res) => {
    const { id } = req.params;
    try {
        const business = await businessService.getBusinessDetailsById(id);
        res.json(business);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createBusiness = async (req, res) => {
    try {
        const files = req.files; // 업로드된 파일들
        const formData = req.body; // 폼 데이터

        if (!files) {
            throw new Error('No files uploaded.');
        }

        // 임의의 고유 ID 생성
        const uniqueId = uuidv4();

        // 이미지 업로드 및 URL 가져오기
        if (!files || Object.keys(files).length === 0) {
            return res.status(400).send('No files uploaded.');
        }

        const fileArray = [];
        Object.keys(files).forEach(key => {
            fileArray.push(...files[key]);
        });

        const imageUploadResults = await imageService.uploadMultipleImages(fileArray, uniqueId);
        
        // 비즈니스 데이터 생성
        const businessData = {
            ...formData,
            id: uniqueId
        };
        const business = await businessService.createBusiness(businessData);

        res.status(201).json({ business, imageUploadResults });
    } catch (error) {
        console.error('Error creating business with images:', error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllBusinesses,
    getBusinessById,
    createBusiness,
};
