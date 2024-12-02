const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('.').sequelize;
const Pet = require('./Pet');
const PetOptions = require('./PetOption');

const PetDetailInfoStatus = sequelize.define('TB_PET_OPTION_STATUS', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    pet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    option_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    whether: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    timestamps: false,
});

module.exports = PetDetailInfoStatus;