const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'node-complete', 'root', 'password',
    {
        dialect: 'mysql',
        host: 'localhost',
        port: 3307
    }
);

module.exports = sequelize;