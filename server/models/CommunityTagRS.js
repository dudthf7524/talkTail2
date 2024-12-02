const { Sequelize, DataTypes } = require('sequelize');
const Community = require('./Community');
const CommunityTag = require('./CommunityTag');
const sequelize = require('../models').sequelize;

const CommunityTagRS = sequelize.define('TB_COMMUNITY_TAG_RS', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    community_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = CommunityTagRS;