const express = require('express');
const router = express.Router();
const petService = require('../services/petService');
const multer = require('multer');
const upload = multer();

// 모든 species 가져오기
const getAllPetSpeciesHandler = async (req, res) => {
    try {
        const species = await petService.getAllPetSpecies();
        res.json(species);
    } catch (error) {
        console.error('Failed to fetch pet species error: ', error);
        res.status(500).json({message: 'Failed to fetch pet species.'});
    }
};

// 특정 species에 따른 모든 breed 가져오기
const getAllPetBreedsHandler = async (req, res) => {
    const speciesID = req.query.species;
    console.log('speciesID: ', speciesID);
    try {
        const breeds = await petService.getAllPetBreeds(speciesID);
        res.json(breeds);
    } catch (error) {
        console.error('Failed to fetch pet breeds error: ', error);
        res.status(500).json({message: `Failed to fetch breeds for species: ${speciesName}.`});
    }
};

// 특정 species에 따른 특이사항 목록 가져오기
const getPetDetailsBySpeciesHandler = async (req, res) => {
    const speciesName = req.query.species;
    try {
        const details = await petService.getPetDetailsBySpecies(speciesName);
        res.json(details);
    } catch (error) {
        console.error('Failed to fetch pet detail informations error: ', error);
        res.status(500).json({ message: `Failed to fetch details for species: ${speciesName}.` });
    }
};

// Controller에서 species_id를 가져오는 방법
const getPetOptionsHandler = async (req, res) => {
    try {
        // 쿼리 파라미터에서 species_id 가져오기
        const species_id = req.query.species;
        console.log('speciesID:', species_id); // 디버그용 콘솔 로그

        if (!species_id) {
            return res.status(400).json({ error: 'species_id is required' });
        }

        const options = await petService.getPetOptionsBySpecies(species_id);
        res.json(options);
    } catch (error) {
        console.error('Failed to fetch pet options error: ', error);
        res.status(500).json({ error: 'Failed to fetch pet options' });
    }
};


// 펫 등록하기
const registerPetHandler = async (req, res) => {
    const { id, platform } = req.user;
    const petData = req.body;

    console.log(id)
    console.log(platform)
    console.log(petData)

    if (req.file) {
        console.log('Uploaded file info:', req.file); // 업로드된 파일의 정보 출력
        petData.image = {
            buffer: req.file.buffer, // 이미지 데이터
            originalname: req.file.originalname, // 업로드된 파일의 이름
            folder: 'pet_images' // 이미지 저장할 폴더 이름
        };
    } else {
        console.log('No file uploaded');
    }

    petData.platform_id = id;
    petData.platform = platform;

    console.log('Processed pet data:', petData);

    try {
        const pet = await petService.registerPet(petData);
        console.log(pet)
        res.status(201).json(pet);
    } catch (error) {
        console.error('Failed to register pet error: ', error);
        res.status(500).json({ message: 'Failed to register pet.' });
    }
};

//자신의 펫 조회
const getMyPetsHandler = async (req, res) => {
    const { id, platform } = req.user;

    try {
        const pets = await petService.getMyPets(id, platform);
        res.json(pets);
    } catch (error) {
        console.error('Failed to fetch my pets error: ', error);
        res.status(500).json({ message: 'Failed to fetch my pets.' });
    }
};

const getPetDetailsHandler = async (req, res) => {
    const petId = req.params.id;

    try {
        const pet = await petService.getPetDetails(petId);
        res.json(pet);
    } catch (error) {
        console.error('Failed to fetch pet details error: ', error);
        res.status(500).json({ message: 'Failed to fetch pet details.' });
    }
};


module.exports = {
    getAllPetSpeciesHandler,
    getAllPetBreedsHandler,
    getPetDetailsBySpeciesHandler,
    getPetOptionsHandler,
    registerPetHandler,
    getMyPetsHandler,
    getPetDetailsHandler
};