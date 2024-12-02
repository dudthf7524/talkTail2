const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;

const BeautyTag = sequelize.define('TB_BEAUTY_TAGS', {
    tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    tag_name: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: '',
    },
}, {
    timestamps: false,
});

module.exports = BeautyTag;