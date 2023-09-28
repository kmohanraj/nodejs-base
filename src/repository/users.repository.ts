import logger from '../util/logger';
import { PrismaDBClient } from '../app';
import { Prisma } from '@prisma/client';
import CONSTANTS from '../config/constants';

const { ERROR } = CONSTANTS.MESSAGES;

export const create = async (
  data: Prisma.usersCreateInput | Prisma.usersUncheckedCreateInput,
  select?: Prisma.usersSelect
) => {
  try {
    return await PrismaDBClient.users.create({ data, select });
  } catch (err) {
    logger.info(
      `${ERROR.USER.USER_CREATE}, { cause: ${err}, payload: ${JSON.stringify(
        data
      )}}`
    );
  }
};
export const update = async (
  data: Prisma.usersUpdateInput,
  condition: Prisma.usersWhereInput
) => {
  try {
    return await PrismaDBClient.users.update({
      data,
      where: condition as unknown as Prisma.usersWhereUniqueInput
    });
  } catch (err) {
    logger.info(`${ERROR.USER.USER_UPDATE}, { cause: ${err}}`);
  }
};
export const remove = async (condition: Prisma.usersWhereUniqueInput) => {
  try {
    return await PrismaDBClient.users.delete({ where: condition });
  } catch (err) {
    logger.info(`${ERROR.USER.USER_DELETE}, {cause: ${err}}`);
  }
};
export const findOne = async (data: Prisma.usersWhereInput) => {
  try {
    return await PrismaDBClient.users.findFirst({ where: data });
  } catch (err) {
    logger.info(`${ERROR.USER.USER_GET_USER}, {cause: ${err}}`);
  }
};
export const findAll = async () => {
  try {
    return await PrismaDBClient.users.findMany({ orderBy: { name: 'asc' } });
  } catch (err) {
    logger.info(`${ERROR.USER.USER_FETCH_ALL}, {cause: ${err}}`);
  }
};
export const findMany = async (data: Prisma.usersFindManyArgs) => {
  try {
    return await PrismaDBClient.users.findMany(data);
  } catch (err) {
    logger.info(`${ERROR.USER.ALL}`);
  }
};
export const findByValue = async (data: Prisma.usersWhereInput) => {
  try {
    return await PrismaDBClient.users.findFirst({
      where: data
    });
  } catch (err) {
    logger.info(`${ERROR.USER.FIND_BY_ID} {cause: ${err}}`);
  }
};
export const softDelete = async (
  condition: Prisma.usersWhereUniqueInput,
  userEmail: string
) => {
  try {
    return await PrismaDBClient.users.update({
      where: condition,
      data: { deleted_at: new Date(), deleted_by: userEmail }
    });
  } catch (err) {
    logger.info(`${ERROR.USER.USER_DELETE}, {cause: ${err}}`);
  }
};
