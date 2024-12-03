const Business = require('../../models/Business');
const Image = require('../../models/Image');
const BeautyTag = require('../../models/BeautyTag');
const BeautyTagRS = require('../../models/BeautyTagRS');
const BusinessInformation = require('../../models/BusinessInformation');
// 특정 카테고리의 모든 업체의 이름, 위치, 메인 이미지를 가져오는 함수
const getBusinessesByCategory = async (category) => {
    try {
        // 비즈니스 데이터 가져오기
        const businesses = await Business.findAll({
            where: { category },
            attributes: ['id', 'name', 'location'],
        });

        // 메인 이미지 가져오기
        const images = await Image.findAll({
            where: { image_type: 'main' },
            attributes: ['endpoint', 'business_id'],
        });

        // 태그 데이터 가져오기
        const tags = await getTagsForBusinesses();

        // 비즈니스 데이터를 기준으로 결과 조합
        const results = businesses.map((business) => {
            // 비즈니스에 해당하는 이미지 찾기
            const businessImage = images.find(
                (image) => image.business_id === business.id
            );

            // 비즈니스에 해당하는 태그 찾기
            const businessTags = tags
                .filter((tag) => tag.businessId === business.id)
                .map((tag) => tag.tagName);

            // 최종 비즈니스 객체 생성
            return {
                id: business.id,
                name: business.name,
                location: business.location,
                mainImage: businessImage ? businessImage.endpoint : null,
                tags: businessTags,
            };
        });

        return results;
    } catch (error) {
        console.error('Error fetching businesses with details:', error);
        throw new Error('Failed to fetch businesses with details');
    }
};

const getTagsForBusinesses = async () => {
    try {
        const tagRelations = await BeautyTagRS.findAll({
            attributes: ['business_id', 'tag_id'],
        });

        // 각 태그 아이디에 대한 정보를 가져옵니다.
        const tags = [];
        for (const relation of tagRelations) {
            const beautyTag = await BeautyTag.findOne({
                where: { tag_id: relation.tag_id },
                attributes: ['tag_name'],
            });

            // 태그가 존재하면 결과에 추가합니다.
            if (beautyTag) {
                tags.push({
                    businessId: relation.business_id,
                    tagName: beautyTag.tag_name,
                });
            }
        }

        return tags;
    } catch (error) {
        console.error('Error fetching tags:', error);
        throw new Error('Failed to fetch tags');
    }
};

const getTagsByBusinessId = async (businessId) => {
    try {
        // 주어진 비즈니스 ID에 대한 태그 관계를 가져옵니다.
        const tagRelations = await BeautyTagRS.findAll({
            where: { business_id: businessId }, // 비즈니스 ID로 필터링
            attributes: ['tag_id'], // tag_id만 가져옴
        });

        // 비즈니스에 연결된 태그 정보를 가져옵니다.
        const tags = [];
        for (const relation of tagRelations) {
            const beautyTag = await BeautyTag.findOne({
                where: { tag_id: relation.tag_id }, // tag_id로 필터링
                attributes: ['tag_name'],
            });

            // 태그가 존재하면 결과에 추가합니다.
            if (beautyTag) {
                tags.push(beautyTag.tag_name);
            }
        }

        return tags; // 태그 이름 배열 반환
    } catch (error) {
        console.error('Error fetching tags:', error);
        throw new Error('Failed to fetch tags');
    }
};

// 특정 아이디의 사업자명, 사업자아이디, 대표명을 제외한 정보를 가지고 오는 함수
const getBusinessDetailsById = async (id) => {
    try {
        const business = await Business.findOne({
            where: { id },
            attributes: {
                exclude: ['business_registration_name', 'business_registration_number', 'business_owner']
            }
        });
        // 이미지 데이터를 가져와서 타입별로 분류
        const images = await Image.findAll({
            where: { business_id: id },
            attributes: ['endpoint', 'image_type'],
        });

        // 이미지 타입별 분류
        const imagesByType = images.reduce((acc, image) => {
            const { image_type, endpoint } = image;
            if (!acc[image_type]) {
                acc[image_type] = [];
            }
            acc[image_type].push(endpoint);
            return acc;
        }, {});

        // 태그 데이터 가져오기
        const tags = await getTagsByBusinessId(id);

        // 비즈니스 객체에 이미지와 태그 정보 추가
        business.dataValues.images = imagesByType; // 타입별로 분류된 이미지 추가
        business.dataValues.tags = tags; // 태그 추가
        
        console.log(business.dataValues);
        return business.dataValues;
    } catch (error) {
        throw new Error('Failed to fetch business details');
    }
};

// 새로운 업체를 생성하는 함수
const createBusiness = async (businessInfo) => {
    try {
        const business = await Business.create({
            business_registration_number : businessInfo.business_registration_number,
            business_registration_name : businessInfo.business_registration_name,
            category : businessInfo.category,
            login_id : businessInfo.login_id,
            login_password : businessInfo. login_password,
            business_owner_name : businessInfo. business_owner_name,
            business_owner_email : businessInfo. business_owner_email,
            business_owner_phone1 : businessInfo. business_owner_phone1,
            business_owner_phone2 : businessInfo. business_owner_phone2,
            business_owner_phone3 : businessInfo. business_owner_phone3,
            created_at: new Date(),
            updated_at: new Date(),
        });
        
        return business;
    } catch (error) {
        throw new Error('Failed to create business', error.message);
    }
};

const createBusinessInformation = async (businessInformationInfo) => {
    console.log("serverce")
    console.log(businessInformationInfo)
    
    try {
        const businessInformation = await BusinessInformation.create({
            business_registration_number: businessInformationInfo.business_registration_number,
            business_name: businessInformationInfo.business_name,
            address_postcode: businessInformationInfo.address_postcode,
            address_road: businessInformationInfo.address_road,
            address_jibun: businessInformationInfo.address_jibun,
            address_detail: businessInformationInfo.address_detail,
            weekday_open_time: businessInformationInfo.weekday_open_time,
            weekday_close_time: businessInformationInfo.weekday_close_time,
            weekend_open_time: businessInformationInfo.weekend_open_time,
            weekend_close_time: businessInformationInfo.weekend_close_time,
            dayon: businessInformationInfo.dayon,
            dayoff: businessInformationInfo.dayoff,
            business_phone1: businessInformationInfo.business_phone1,
            business_phone2: businessInformationInfo.business_phone2,
            business_phone3: businessInformationInfo.business_phone3,
            business_comment: businessInformationInfo.business_comment,
            business_no_show: businessInformationInfo.business_no_show,
            created_at: new Date(),
            updated_at: new Date(),
        });
        return businessInformation;
    } catch (error) {
        throw new Error('Failed to create businessInformation', error.message);
    }
};

// 업체 정보를 수정하는 함수
const updateBusiness = async (id, updateInfo) => {
    try {
        const business = await Business.update(updateInfo, {
            where: { id }
        });
        if (business[0] === 0) {
            throw new Error('Business not found or no changes made');
        }
        return await Business.findOne({ where: { id } });
    } catch (error) {
        throw new Error('Failed to update business');
    }
};

const processAndSaveTags = async (species, business_id) => {
    try {
        // species 값을 띄어쓰기를 제거하고 쉼표로 나눕니다.
        const tags = species.replace(/\s/g, '').split(',');

        for (const tagName of tags) {
            // 태그가 이미 존재하는지 확인
            let tag = await BeautyTag.findOne({ where: { tag_name: tagName } });

            if (!tag) {
                // 태그가 존재하지 않으면 새 태그 생성
                tag = await BeautyTag.create({ tag_name: tagName });
            }

            // 태그-업체 관계 저장
            await BeautyTagRS.create({
                business_id: business_id,
                tag_id: tag.tag_id,
            });
        }
    } catch (error) {
        console.error('Error processing and saving tags:', error);
        throw new Error('Failed to process and save tags');
    }
};

module.exports = {
    getBusinessesByCategory,
    getBusinessDetailsById,
    createBusiness,
    updateBusiness,
    createBusinessInformation,
};