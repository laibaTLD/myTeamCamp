require('dotenv').config();  // Load env variables immediately

const { Sequelize } = require('sequelize');
const config = require('./config');

console.log("DB_PASSWORD from env:", process.env.DB_PASSWORD);

const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: config.db.dialect,
    logging: config.db.logging,
  }
);

// Test DB connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
  }
})();

module.exports = sequelize;
