const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;
const Beauty = require('./Business');
const BeautyStyle = require('./BeautyOption');
const BeautyWeight = require('./PetWeight');

const BeautyPrice = sequelize.define('TB_BEAUTY_PRICES', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    beauty_id: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    weight_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    style_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    timestamps: false,
});

module.exports = BeautyPrice;