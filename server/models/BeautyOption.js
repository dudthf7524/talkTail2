const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('.').sequelize;

const BeautyStyle = sequelize.define('TB_BEAUTY_OPTIONS', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    option: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: '',
    },
    type: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    timestamps: false,
});

module.exports = BeautyStyle;