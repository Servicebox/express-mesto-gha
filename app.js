const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const limiter = require('./middlewares/rateLimiter');

const routeSignup = require('./routes/signup');
const routeSignin = require('./routes/signin');

const auth = require('./middlewares/auth');

const routeUsers = require('./routes/users');
const routeCards = require('./routes/cards');

const NotFoundError = require('./errors/NotFoundError');
const error = require('./middlewares/error');

const URL = 'mongodb://localhost:27017/mestodb ';

mongoose.set('strictQuery', true);

mongoose
  .connect(URL)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('БД успешно подключена');
  })
  .catch(() => {
    // eslint-disable-next-line no-console
    console.log('Не удалось подключиться к БД');
  });

const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(limiter);

app.use('/', routeSignup);
app.use('/', routeSignin);

app.use(auth);

app.use('/users', routeUsers);
app.use('/cards', routeCards);

app.use((req, res, next) => next(new NotFoundError('Страницы по запрошенному URL не существует')));
app.use(errors());
app.use(error);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on port 3000');
});
