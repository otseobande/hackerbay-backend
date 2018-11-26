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

const validatePatch = validate({
  body: {
    document: Joi.object().required(),
    patch: Joi.object().keys({
      op: Joi.string().required(),
      path: Joi.string().required(),
      value: Joi.any(),
    }).required(),
  },
});

export default {
  validateLogin,
  validateImageUrl,
  validatePatch,
};
