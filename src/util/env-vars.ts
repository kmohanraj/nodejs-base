/**
 * It validates the environment variables based on the process.env
 * This file needs to be updated immediately after updating .env
 */

import path from 'path';
import dotenv from 'dotenv';
import joi from 'joi';
import logger from './logger';

declare const process: {
  cwd: () => string;
  env: {
    NODE_ENV: string;
    PORT: string;
    SALT_ROUNDS: string;
    REFRESH_TOKEN_EXPIRY: string;
    ACCESS_TOKEN_EXPIRY: string;
    BYTE_LENGTH: number;
    CORS_ORIGIN: string;
    THUMBNAIL_BUCKET_ACCESS_KEY: string;
    THUMBNAIL_BUCKET_SECRET_ACCESS_KEY: string;
    THUMBNAIL_BUCKET_NAME: string;
    SEND_GRID_KEY: string;
    FROM_ADDRESS: string;
  };
};
dotenv.config({
  path: path.resolve(process.cwd(), '.env')
});
const envSchema = joi
  .object()
  .keys({
    NODE_ENV: joi.string().valid('prod', 'test', 'dev', 'staging').required(),
    PORT: joi.string().valid('5000').required(),
    SALT_ROUNDS: joi.number().required(),
    REFRESH_TOKEN_EXPIRY: joi.string().required(),
    ACCESS_TOKEN_EXPIRY: joi.string().required(),
    BYTE_LENGTH: joi.number().required(),
    CORS_ORIGIN: joi.string().required(),
    THUMBNAIL_BUCKET_ACCESS_KEY: joi.string().required(),
    THUMBNAIL_BUCKET_SECRET_ACCESS_KEY: joi.string().required(),
    THUMBNAIL_BUCKET_NAME: joi.string().required(),
    SEND_GRID_KEY: joi.string().required(),
    FROM_ADDRESS: joi.string().required()
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

const {
  PORT,
  SALT_ROUNDS,
  REFRESH_TOKEN_EXPIRY,
  ACCESS_TOKEN_EXPIRY,
  BYTE_LENGTH,
  CORS_ORIGIN,
  THUMBNAIL_BUCKET_ACCESS_KEY,
  THUMBNAIL_BUCKET_SECRET_ACCESS_KEY,
  THUMBNAIL_BUCKET_NAME,
  SEND_GRID_KEY,
  FROM_ADDRESS
} = env;

export default {
  port: PORT,
  saltRounds: SALT_ROUNDS,
  token: {
    accessTokenExpiry: ACCESS_TOKEN_EXPIRY,
    refreshTokenExpiry: REFRESH_TOKEN_EXPIRY,
    byteLength: BYTE_LENGTH
  },
  cors: {
    origin: CORS_ORIGIN
  },
  thumbnailBucket: {
    accessKey: THUMBNAIL_BUCKET_ACCESS_KEY,
    secretKey: THUMBNAIL_BUCKET_SECRET_ACCESS_KEY,
    name: THUMBNAIL_BUCKET_NAME
  },
  mail: {
    apiKey: SEND_GRID_KEY,
    from: FROM_ADDRESS
  }
};
