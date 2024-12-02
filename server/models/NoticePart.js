const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;

const NoticePart = sequelize.define('TB_NOTICE_PARTS', {
    part_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    part: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = NoticePart;