const { DataTypes } = require('sequelize');
const sequelize = require('./connection');

const Product = sequelize.define('Product', {
    campaignID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    campaignName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adGroupID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fsnID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adSpend: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    views: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    clicks: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    directUnits: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    indirectUnits: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    directRevenue: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    indirectRevenue: {
        type: DataTypes.FLOAT,
        allowNull: true,
    }
});

module.exports = Product;