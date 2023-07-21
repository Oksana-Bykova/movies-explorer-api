require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const router = require('./routes');

const errorHandler = require('./middlwares/error');

const app = express();

const cors = require('./middlwares/cors');

const { requestLogger, errorLogger } = require('./middlwares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(express.json());

app.use(cors);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(cookieParser());

// app.get('/signout', (req, res) => {
//  res.clearCookie('jwt').send({ message: 'Выход выполнен успешно' });
// });

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Слушаю порт 3000');
});
