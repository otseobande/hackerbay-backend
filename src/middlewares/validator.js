import Joi from 'joi';
import validate from 'express-validation';

const validateLogin = validate({
  body: {
    username: Joi.string().required(),
    password: Joi.string().required(),
  },
});

export default {
  validateLogin,
};
