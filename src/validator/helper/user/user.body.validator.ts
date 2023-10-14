import Joi from 'joi';
import express from 'express';

const commonParams = (isRequired: boolean) => {
  switch (isRequired) {
    case true:
      return {
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string()
          .pattern(
            new RegExp(
              // eslint-disable-next-line no-useless-escape
              /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,}$/m
            )
          )
          .required()
          .messages({
            'string.pattern.base':
              'Password Must be more than 8 characters and contain an uppercase, lowercase letter with a number and special character'
          }),
        phone: Joi.string().required(),
        role_id: Joi.number().integer().valid(1, 2, 3, 4).required()
      };
    case false:
      return Joi.object({
        name: Joi.string().optional(),
        phone: Joi.string().optional(),
        email: Joi.string().optional(),
        password: Joi.string().optional(),
        role_id: Joi.number().optional()
      });
    default:
      return null;
  }
};

export const regValidator = (
  body: express.RequestHandler
): Joi.ValidationResult => {
  return Joi.object()
    .keys(commonParams(true) as unknown as Joi.PartialSchemaMap)
    .prefs({ errors: { label: 'key' } })
    .validate(body);
};

export const updateValidator = (
  body: express.RequestHandler
): Joi.ValidationResult => {
  return Joi.object()
    .keys({ id: Joi.number().required(), data: commonParams(false) })
    .prefs({ errors: { label: 'key' } })
    .validate(body);
};

export const resetPassword = (
  body: express.RequestHandler
): Joi.ValidationResult => {
  return Joi.object()
    .keys({
      email: Joi.string().email(),
      oldPassword: Joi.string().required(),
      newPassword: Joi.string().required()
    })
    .prefs({ errors: { label: 'key' } })
    .validate(body);
};

export const loginBodyValidator = (
  body: express.RequestHandler
): Joi.ValidationResult => {
  return Joi.object()
    .keys({
      email: Joi.string().required(),
      password: Joi.string().required()
    })
    .prefs({ errors: { label: 'key' } })
    .validate(body);
};
