const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;
const Beauty = require('./Business');

const BeautyReview = sequelize.define('TB_BEAUTY_REVIEWS', {
    review_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    beauty_id: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    platform_id: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    platform: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    grade: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    contents: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
    },
}, {
    timestamp: false,
});

module.exports = BeautyReview;