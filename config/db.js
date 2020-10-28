/* eslint-disable operator-linebreak */
/* eslint-disable no-console */
const mongoose = require('mongoose');
const { dbConnectionUrl, dbTestConnectionUrl } = require('./constant');

module.exports = {
  dbConnection: async () => {
    try {
      const dbConnUrl =
        process.env.NODE_ENV === 'test' ? dbConnectionUrl : dbTestConnectionUrl;
      await mongoose.connect(dbConnUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log('MongoDB connected!');
    } catch (error) {
      console.log('MongoDB not connected!', error);
    }
  },
};
