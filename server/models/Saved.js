const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;

const Saved = sequelize.define('TB_SAVEDS', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    platform_id: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    platform: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    business_id: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = Saved;