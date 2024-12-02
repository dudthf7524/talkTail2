const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;
const Community = require('./Community');

const Comment = sequelize.define('TB_COMMENTS', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TB_COMMUNITIES',
            key: 'id',
        },
    },
    platform_id: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    platform: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    contents: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
    },
}, {
    timestamps: false,
});

// 외래 키 관계 정의
Comment.belongsTo(Community, { foreignKey: 'post_id', targetKey: 'id' });

module.exports = Comment;