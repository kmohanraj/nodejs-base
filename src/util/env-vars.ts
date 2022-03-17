import path from 'path';
import dotenv from 'dotenv';
import Joi from 'joi';
import logger from './logger';

declare const process: {
  cwd: () => string;
  env: {
    NODE_ENV: string;
    PORT: string;
    CORS_ORIGIN: string;
  };
};
dotenv.config({
  path: path.resolve(process.cwd(), '.env')
});

const envSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('prod', 'test', 'dev', 'staging').required(),
    PORT: Joi.string().valid('5000').required(),
    CORS_ORIGIN: Joi.string().required()
  })
  .unknown();

const { value: env, error } = envSchema
  .prefs({
    errors: { label: 'key' }
  })
  .validate(process.env);

if (error) {
  logger.error(
    `Error in .env.${process.env.NODE_ENV} file { cause: ${error.details}}`
  );
  throw error.details;
}

const { PORT, CORS_ORIGIN } = env;

export default {
  port: PORT,
  cors: { origin: CORS_ORIGIN }
};