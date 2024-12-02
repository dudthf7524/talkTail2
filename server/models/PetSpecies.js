const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;

const PetSpecies = sequelize.define('TB_PET_SPECIES', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    species: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = PetSpecies;