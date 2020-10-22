const dotEnv = require('dotenv');

dotEnv.config();

const config = {
  port: process.env.PORT || 8000,
  dbConnectionUrl: process.env.DB_CONNECTION_URL,
  dbTestConnectionUrl: process.env.DB_TEST_CONNECTION_URL,
  saltRounds: process.env.SALT_ROUNDS,
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = config;
