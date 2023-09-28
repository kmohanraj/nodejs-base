import jwt from 'jsonwebtoken';

import logger from './logger';
import CONSTANTS from '../config/constants';
import * as TokenKeyRepository from '../repository/tokenKey.repository';
import { users } from '@prisma/client';

export default async (userData: users) => {
  try {
    // Get key for Refresh Token
    const key = await TokenKeyRepository.findOne({ active: true });
    // Get refresh token from the db

    // Check if refresh token is valid
    return jwt.verify(
      userData.access_token as string,
      key?.token as string,
      (err, data) => {
        if (err) {
          logger.error(err);
          return CONSTANTS.UTILS.REFRESH_TOKEN_EXPIRED;
        }

        if (data) {
          /**
           * We can consider here the refresh token is valid.
           * It can be used to create access tokens now...
           */
          //   Send back the newly created access token
          return jwt.sign(data, userData.access_token as string);
        }
      }
    );
  } catch (err) {
    logger.error(`${CONSTANTS.UTILS.REFRESH_TOKEN}, { cause: ${err} }`);
    return CONSTANTS.UTILS.REFRESH_ACCESS_TOKEN;
  }
};
