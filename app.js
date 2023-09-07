require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const helmet = require('helmet');
const rateLimiter = require('./middlwares/rateLimiter');

const router = require('./routes');

const errorHandler = require('./middlwares/error');

const app = express();

const cors = require('./middlwares/cors');

const { requestLogger, errorLogger } = require('./middlwares/logger');
const { MongoDB } = require('./utils/constants');

const { PORT = 3000, DB_URL = MongoDB } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(express.json());

app.use(cors);

app.use(requestLogger);
app.use(helmet());
// app.use(rateLimiter);

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
