/* eslint-disable operator-linebreak */
/* eslint-disable no-console */
const mongoose = require('mongoose');
// const { dbConnectionUrl, dbTestConnectionUrl } = require('./constant');

module.exports = {
  dbConnection: async () => {
    try {
      const dbConnUrl =
        process.env.NODE_ENV === 'test'
          ? 'mongodb+srv://naman:naman007@cluster0.xnged.mongodb.net/manga_test?retryWrites=true&w=majority'
          : 'mongodb+srv://naman:naman007@cluster0.xnged.mongodb.net/manga?retryWrites=true&w=majority';
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
