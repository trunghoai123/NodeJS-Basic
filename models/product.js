const {Sequelize, DataTypes} = require('sequelize');

const sequelize = require('../util/database');
const Product = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  }, 
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl:{
    type: DataTypes.STRING,
    allowNull: false,
  },
})

module.exports = Product;