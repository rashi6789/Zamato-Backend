const Sequelize = require('sequelize');

const db = new Sequelize('zamato', 'root', 'Himanshu@91', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

 

module.exports = db;