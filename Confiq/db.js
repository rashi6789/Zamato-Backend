const Sequelize = require('sequelize');

const connectionString = process.env.DATABASE_URL || process.env.DB_URL || 'mysql://root:tKdqNuIvwawwgwkDEiKQTeNJtcCzLkdt@tokaido.proxy.rlwy.net:51081/railway';
const db = new Sequelize(connectionString, {
  dialect: 'mysql',
 
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = db;