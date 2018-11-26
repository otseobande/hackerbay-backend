import Joi from 'joi';
import validate from 'express-validation';

const validateLogin = validate({
  body: {
    username: Joi.string().required(),
    password: Joi.string().required(),
  },
});

const validateImageUrl = validate({
  body: {
    imageUrl: Joi.string().uri({
      scheme: [
        'http',
        'https',
      ],
    }).required(),
  },
});

export default {
  validateLogin,
  validateImageUrl,
};
