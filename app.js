const express = require('express');

const mongoose = require('mongoose');

const helmet = require('helmet');

const app = express();

const router = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '64ac2335d1eb7f1fe412d932',
  };
  next();
});

app.use(express.json());
app.use(helmet());
app.use('/', router);
app.use('/', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер запущен!');
});
