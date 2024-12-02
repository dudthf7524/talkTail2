const Saved = require('../../models/Saved');
const Business = require('../../models/Business');

// 찜 항목 등록
const registerSaved = async (id, platform, businessId) => {
    try {
        const [saved, created] = await Saved.findOrCreate({
            where: {
                platform_id: id,
                platform: platform,
                business_id: businessId,
            },
            defaults: {
                platform_id: id,
                platform: platform,
                business_id: businessId,
            },
        });

        if (!created) {
            return { message: '이미 찜한 업체입니다.' };
        }

        return saved;
    } catch (error) {
        throw new Error(`Failed to save business: ${error.message}`);
    }
};

// 찜한 목록 조회
const getSaved = async (id, platform) => {
    try {
        const savedId = await Saved.findAll({
            where: {
                platform_id: id,
                platform: platform,
            },
            attributes: ['business_id'],
        });

        const saved = await Business.findAll({
            where: {
                id: savedId.map((item) => item.business_id),
            },
            attributes: ['id', 'name', 'location'],
        });

        return saved;
    } catch (error) {
        throw new Error(`Failed to get saved businesses: ${error.message}`);
    }
};

// 찜한 항목 삭제
const deleteSaved = async (id, platform, businessId) => {
    try {
        const result = await Saved.destroy({
            where: {
                platform_id: id,
                platform: platform,
                business_id: businessId,
            },
        });

        if (result === 0) {
            throw new Error('찜한 항목을 찾을 수 없습니다.');
        }
    } catch (error) {
        throw new Error(`Failed to delete saved business: ${error.message}`);
    }
};

module.exports = {
    registerSaved,
    getSaved,
    deleteSaved,
};