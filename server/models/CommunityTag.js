const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;

const CommunityTag = sequelize.define('TB_COMMUNITY_TAGS', {
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

module.exports = CommunityTag;