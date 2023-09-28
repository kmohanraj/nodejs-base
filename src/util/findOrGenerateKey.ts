import crypto from 'crypto';
import logger from './logger';
import envVars from './env-vars';
import * as TokenKeyRepository from '../repository/tokenKey.repository';
import CONSTANTS from '../config/constants';

export default async (): Promise<string | null> => {
  try {
    const existingKey = await TokenKeyRepository.findOne({ active: true });
    if (existingKey) {
      return existingKey.token;
    } else {
      const data = await TokenKeyRepository.create({
        token: crypto
          .randomBytes(Number(envVars.token.byteLength))
          .toString('hex')
      });
      return data?.token as string;
    }
  } catch (err) {
    logger.info(`${CONSTANTS.UTILS.UNABLE_TO_GENERATE_TOKEN} { cause: ${err}}`);
    return null;
  }
};
