const { Sequelize, DataTypes } = require('sequelize');
const PetSpecies = require('./PetSpecies');
const sequelize = require('../models').sequelize;

const PetBreed = sequelize.define('TB_PET_BREEDS', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    pet_species: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_PET_SPECIES',
            key: 'id',
        },
    },
    breed: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '',
    }
}, {
    timestamps: false,
});

// 외래키 관계 설정
PetBreed.belongsTo(PetSpecies, { foreignKey: 'pet_species', targetKey: 'id'});

module.exports = PetBreed;