// генерация ключа в терминале через команду
// node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"

const SECRET_KEY = 'e48c3013265b869e0e40ebd19adf5f1f12b90129191b01ef7f7bbd722937a074';

// лимит
const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  max: 120,
  windowMS: 45000,
  message: 'В настоящий момент превышено количество запросов на сервер. Пожалуйста, попробуйте повторить позже',
});

// регулярное выражение
const URL_REGEX = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s!"#$%&'()*+,:;<=>?@[\\\]`{|}~]*$/;
const CREATED_STATUS = 201;

module.exports = {
  SECRET_KEY,
  URL_REGEX,
  CREATED_STATUS,
  rateLimiter,
  limiter,

};
