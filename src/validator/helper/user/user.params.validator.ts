import Joi from 'joi';

export const userParamsValidator = (params: unknown): Joi.ValidationResult => {
  return Joi.object()
    .keys({
      userId: Joi.number().integer().required()
    })
    .prefs({ errors: { label: 'key' } })
    .validate(params);
};
