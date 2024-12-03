const { v4: uuidv4 } = require('uuid');
const businessService = require('../services/businessService');
const imageService = require('../services/imgService');

const getAllBusinesses = async (req, res) => {
    try {
        console.log('aaa')
        const { category } = req.query;
        console.log('bbb')
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
        const formData = req.body; // 폼 데이터
        console.log(formData)
        // 비즈니스 데이터 생성
        const business = await businessService.createBusiness(formData);
        console.log(business)
        res.status(201).json({ business });
    } catch (error) {
        console.error('Error creating business', error.message);
        res.status(500).json({ error: error.message });
    }
};

const createBusinessInformation = async (req, res) => {
    try {
        console.log('aaaaaaaaaaaaaaaa')
        const files = req.files; // 업로드된 파일들
        const formData = req.body; // 폼 데이터
        console.log('Initial req.files:', req.files);
        console.log('bbbbbbbbbbbbbbbb')
        console.log(formData)
        console.log(formData.business_registration_number)
        console.log('bbbbbbbbbbbbbbbb')
        if (!files) {
            throw new Error('No files uploaded.');
        }
        console.log(Object.keys(files).length)
        const businessInformation = await businessService.createBusinessInformation(formData);

        // 이미지 업로드 및 URL 가져오기
        if (!files || Object.keys(files).length === 0) {
            return res.status(400).send('No files uploaded.');
        }
        console.log('b')
        const fileArray = [];
        Object.keys(files).forEach(key => {
            fileArray.push(...files[key]);
        });
        
        console.log('ccccccccccccccccccccc')
        console.log(fileArray)
        console.log('dddddddddddddddddddd')
        //const imageUploadResults = await imageService.uploadMultipleImages(fileArray, uniqueId);

        res.status(201).json({ businessInformation, imageUploadResults });
    } catch (error) {
        console.error('Error creating business with images:', error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllBusinesses,
    getBusinessById,
    createBusiness,
    createBusinessInformation,
};
