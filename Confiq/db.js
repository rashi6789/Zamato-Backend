require('dotenv').config();

const { Sequelize } = require('sequelize');

const databaseUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;

const commonOptions = {
  dialect: 'mysql',
  logging: false,
  dialectOptions: process.env.MYSQL_SSL === 'true'
    ? { ssl: { require: true, rejectUnauthorized: false } }
    : {},
};

// Railway's MySQL service exposes MYSQLHOST, MYSQLPORT, MYSQLUSER,
// MYSQLPASSWORD and MYSQLDATABASE. DATABASE_URL/MYSQL_URL is also supported
// for providers that expose a single connection URL.
const db = databaseUrl
  ? new Sequelize(databaseUrl, commonOptions)
  : new Sequelize(
    process.env.MYSQLDATABASE || process.env.DB_NAME || 'zamato',
    process.env.MYSQLUSER || process.env.DB_USER || 'root',
    process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
    {
      ...commonOptions,
      host: process.env.MYSQLHOST || process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.MYSQLPORT || process.env.DB_PORT || 3306),
    },
  );

module.exports = db;
