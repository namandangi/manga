/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable no-undef */
const express = require('express');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const morgan = require('morgan');

app = express();

mongoose.connect('mongodb://localhost:27017/comic_test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);
dotEnv.config();

const mangaRouter = require('./routes/mangas');
const userRouter = require('./routes/users');

app.use('', mangaRouter);
app.use('', userRouter);

app.listen(process.env.PORT || 8000, process.env.IP, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
