const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('.').sequelize;

const PetOptions = sequelize.define('TB_PET_OPTIONS', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    option: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '',
    },
    true: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: false,
    },
    false: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: false,
    },
}, {
    timestamps: false,
});

module.exports = PetOptions;