// models/BeautyTagRS.js

const { DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;
const Business = require('./Business');
const BeautyTag = require('./BeautyTag');

const BeautyTagRS = sequelize.define('TB_BEAUTY_TAG_RS', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    business_id: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'TB_BEAUTY_TAG_RS', // 테이블 이름 확인
    timestamps: false,
});

module.exports = BeautyTagRS;