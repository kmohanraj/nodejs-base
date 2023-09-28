import { Prisma } from '@prisma/client';
import { PrismaDBClient } from '../app';
import logger from '../util/logger';
import CONSTANTS from '../config/constants';

const { TOKEN_KEY } = CONSTANTS.MESSAGES.ERROR;

export const create = async (data: Prisma.tokenKeyCreateInput) => {
  try {
    return await PrismaDBClient.tokenKey.create({ data });
  } catch (err) {
    logger.info(`${TOKEN_KEY.CREATE} { cause: ${err}, payload: ${data}}`);
  }
};

export const update = async (
  data: Prisma.tokenKeyUpdateInput,
  condition: Prisma.tokenKeyWhereUniqueInput
) => {
  try {
    return await PrismaDBClient.tokenKey.update({ data, where: condition });
  } catch (err) {
    logger.info(`${TOKEN_KEY.UPDATE} { cause: ${err}, payload: ${data}}`);
  }
};

export const findOne = async (data: Prisma.tokenKeyWhereInput) => {
  try {
    return await PrismaDBClient.tokenKey.findFirst({
      where: data
    });
  } catch (err) {
    logger.info(`${TOKEN_KEY.GET} { cause: ${err}, payload: ${data}}`);
  }
};
