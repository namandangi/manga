/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable no-undef */
const express = require('express');
const morgan = require('morgan');
const mangaRouter = require('./routes/mangas');
const userRouter = require('./routes/users');
const { dbConnection } = require('./config/db');
const { port } = require('./config/constant');

app = express();

async function main() {
  await dbConnection();

  app.set('view engine', 'ejs');
  app.use(express.json());
  app.use(express.static(`${__dirname}/public`));
  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms')
  );

  app.use('', mangaRouter);
  app.use('', userRouter);

  return app;
}

main().then((server) => {
  server.listen(port, process.env.IP, () => {
    console.log(`server running on port ${port}`);
  });
});

module.exports = app;
