require('dotenv').config();
console.log("DB_PASSWORD from env:", process.env.DB_PASSWORD);

module.exports = {
  port: process.env.PORT || 5000,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
  },
  jwtSecret: process.env.JWT_SECRET || 'supersecret',
  bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10,
};
