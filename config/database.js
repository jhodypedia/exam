const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cbt', 'root', 'password_mysql_kamu', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;
