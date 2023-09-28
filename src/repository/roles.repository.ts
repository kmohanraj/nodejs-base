import { Prisma } from '@prisma/client';
import { PrismaDBClient } from '../app';
import logger from '../util/logger';
import CONSTANTS from '../config/constants';

export const getRoleName = async (data: Prisma.rolesWhereInput) => {
  try {
    return await PrismaDBClient.roles.findFirst({ where: data });
  } catch (err) {
    logger.info(`${CONSTANTS.MESSAGES.ERROR.ROLE.ROLE_GET}, {cause: ${err}}`);
  }
};

export const fetchAll = async (data: Prisma.rolesFindManyArgs) => {
  try {
    return await PrismaDBClient.roles.findMany(data);
  } catch (err) {
    logger.info(`${CONSTANTS.MESSAGES.ERROR.ROLE.ROLE_GET}, { cause: ${err}}`);
  }
};
