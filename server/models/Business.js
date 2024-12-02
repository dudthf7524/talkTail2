const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('.').sequelize;

const Business = sequelize.define('TB_BUSINESSES', {
    business_registration_number: {
        type: DataTypes.STRING(200),
        allowNull: false,
        primaryKey: true,
    },
    business_registration_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: '',
    },
    category: {
        type: DataTypes.ENUM('beauty', 'food', 'shopping', 'kindergarten', 'hotel', 'etc'),
        allowNull: false,
    },
    login_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    login_password: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    
    business_owner_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: '',
    },
    business_owner_email: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 5.0,
    },
    business_owner_phone1: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    business_owner_phone2: {
        type: DataTypes.TIME,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = Business;