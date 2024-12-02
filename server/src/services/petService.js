//const { Sequelize, DataTypes } = require('sequelize');
//const sequelize = require('.').sequelize;
const PetSpecies = require('../../models/PetSpecies');
const PetBreeds = require('../../models/PetBreed');
const Pet = require('../../models/Pet');
const PetOptions = require('../../models/PetOption');
const PetOptionRS = require('../../models/PetOptionRS');
const PetOptionStatus = require('../../models/PetOptionStatus');
const { at } = require('lodash');
const imageService = require('../services/imgService');

// 모든 species를 가져오는 함수
const getAllPetSpecies = async () => {
    try {
        const petSpecies = await PetSpecies.findAll({
            attributes: ['id', 'species'],
            raw: true  // raw: true를 사용하여 단순한 데이터 객체 배열을 반환받음
        });

        return petSpecies;  // pet_id와 species를 포함한 객체 배열을 그대로 반환
    } catch (error) {
        throw new Error(`Failed to fetch pet species: ${error.message}`);
    }
};


// 사용자가 입력한 species를 바탕으로 인덱스 값을 가져오는 함수
const getSpeciesIdByName = async (speciesName) => {
    try {
        const speciesRecord = await PetSpecies.findOne({
            where: { species: speciesName },
            attributes: ['id']
        });
        if (!speciesRecord) {
            throw new Error(`Species not found: ${speciesName}`);
        }
        return speciesRecord.id;
    } catch (error) {
        throw new Error(`Failed to fetch species ID: ${error.message}`);
    }
};

// 특정 species에 포함된 모든 breed를 가져오는 함수
const getAllPetBreeds = async (speciesId) => {
    try {
        const petBreeds = await PetBreeds.findAll({
            where: { pet_species: speciesId},
            attributes: ['id','breed']
        });
        return petBreeds.map(breed => ({
            id: breed.id,
            breed: breed.breed
        }));
    } catch (error) {
        throw new Error(`Failed to fetch pet breeds: ${error.message}`);
    }
};

// 특정 species에 따른 특이사항 목록을 가져오는 함수
const getPetOptionsBySpecies = async (species_id) => {
    try {
        // 첫 번째 쿼리: 해당 species_id에 대한 option_id를 가져옵니다.
        const OptionID = await PetOptionRS.findAll({
            where: { species_id },
            attributes: ['option_id'],
        });

        // 가져온 option_id 목록을 배열로 추출합니다.
        const optionIds = OptionID.map(option => option.option_id);

        // 두 번째 쿼리: 위에서 얻은 option_id 목록에 해당하는 옵션을 가져옵니다.
        const petOptions = await PetOptions.findAll({
            where: {
                id: optionIds,
            },
            attributes: ['id', 'option', 'true', 'false'],
        });

        // 가져온 옵션 데이터를 반환합니다.
        return petOptions.map(petOption => ({
            optionId: petOption.id,
            option: petOption.option,
            true: petOption.true,
            false: petOption.false,
        }));
    } catch (error) {
        throw new Error(`Failed to fetch pet options for species_id ${species_id}: ${error.message}`);
    }
};

// 펫 등록 함수
const registerPet = async (petData) => {
    console.log('aaaa')
    console.log('bbbb')
    console.log('cccc')
    console.log(petData)
    try {
        // 생일 파싱 - YY/MM/DD 형식으로 가정
        const [year, month, day] = petData.birthDate.split('/');
        const parsedYear = parseInt(year, 10) < 50 ? `20${year}` : `19${year}`; // 50년 이전은 2000년대, 이후는 1900년대
        const birthDate = new Date(`${parsedYear}-${month}-${day}`);
        console.log('Parsed birth date:', birthDate);

        // 펫 기본 정보 저장
        const pet = await Pet.create({
            platform_id: petData.platform_id,
            platform: petData.platform,
            pet_name: petData.name,
            pet_species: petData.species,
            pet_breed: petData.breed,
            pet_birth: birthDate.toISOString().split('T')[0], // 날짜 형식 변환
            pet_weight: petData.weight,
            pet_neuter: petData.neuter,
            pet_gender: petData.gender,
            pet_etc: petData.etc,
        });

        const petId = pet.pet_id;

        // 이미지 처리
        let petImg = null;
        if (petData.image) {
            petImg = await imageService.uploadPetImage(petData.image, petId, 'pet');
        }

        // // 펫 상세 정보 저장
        // if (Array.isArray(petData.details)) {
        //     const petDetails = petData.details.map(detail => ({
        //         pet_id: petId,
        //         option_id: detail.id,
        //         whether: detail.value === 1,
        //     }));

        //     await PetOptionStatus.bulkCreate(petDetails);
        // } else {
        //     console.warn('Pet details are missing or not an array');
        // }

        return { pet, petImg};
    } catch (error) {
        throw new Error(`Failed to register pet: ${error.message}`);
    }
};

// 자신의 펫 조회
const getMyPets = async (id, platform) => {
    try {
        // 1. Pet 데이터 조회
        const pets = await Pet.findAll({
            where: { platform_id: id, platform: platform },
            attributes: ['pet_id', 'pet_name', 'pet_species', 'pet_breed', 'pet_weight', 'pet_gender', 'pet_birth'],
        });

        // 2. pet_breed에 따라 품종 이름 조회 및 추가
        for (let pet of pets) {
            const breedInfo = await PetBreeds.findOne({
                where: { id: pet.pet_breed },
                attributes: ['breed']
            });
            pet.dataValues.breedName = breedInfo ? breedInfo.breed : null;
        }

        // 3. pet_id에 따라 이미지 조회 및 추가
        const petIds = pets.map(pet => pet.pet_id);
        const petImages = await imageService.getPetImages(petIds);

        pets.forEach(pet => {
            pet.dataValues.image = petImages[pet.pet_id] || null;
        });

        return pets;
    } catch (error) {
        throw new Error(`Failed to fetch pets: ${error.message}`);
    }
};

const getPetDetails = async (petId) => {
    try {
        // 펫 기본 정보 가져오기
        const pet = await Pet.findOne({
            where: { pet_id: petId },
        });

        if (!pet) {
            throw new Error(`Pet with ID ${petId} not found.`);
        }

        // 펫 이미지 가져오기 (해당 펫 ID에 해당하는 이미지 링크)
        const petImages = await imageService.getPetImages([petId]);
        const petImage = petImages[petId] || null;

        if (!petImage) {
            console.warn(`No image found for pet with ID ${petId}.`);
        }

        // 펫 종 정보 가져오기
        const petSpecies = await PetSpecies.findOne({
            where: { id: pet.pet_species },
            attributes: ['species'],
        });

        // 펫 품종 정보 가져오기
        const petBreed = await PetBreeds.findOne({
            where: { id: pet.pet_breed },
            attributes: ['breed'],
        });

        // 결과 리턴
        return {
            ...pet.toJSON(),  // 펫 기본 정보
            species: petSpecies ? petSpecies.species : null, // 종 정보 추가
            breed: petBreed ? petBreed.breed : null,  // 품종 정보 추가
            image: petImage || 'default_image_url',  // 이미지 정보 추가 (없으면 기본 이미지 URL 반환)
        };
    } catch (error) {
        throw new Error(`Failed to fetch pet details: ${error.message}`);
    }
};

module.exports = {
    getAllPetSpecies,
    getSpeciesIdByName,
    getAllPetBreeds,
    getPetOptionsBySpecies,
    registerPet,
    getMyPets,
    getPetDetails,
};