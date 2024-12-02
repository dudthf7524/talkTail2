const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('.').sequelize;

const PetWeight = sequelize.define('TB_PET_WEIGHTS', {
    weight_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    size_category: {  // 기존 weight 컬럼을 더 명확하게 size_category로 변경
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: '',
    },
    min_weight: {  // 최소 무게를 저장할 컬럼 추가
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    max_weight: {  // 최대 무게를 저장할 컬럼 추가
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    species_id : {  // 펫 종류를 저장할 컬럼 추가
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = PetWeight;