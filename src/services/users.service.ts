import { Prisma } from '@prisma/client';
import bcryptCompareHash from '../util/bcryptCompareHash';
import logger, { loginRecords } from '../util/logger';
import signJWT from '../util/signJWT';
import * as UserRepository from '../repository/users.repository';
import CONSTANTS from '../config/constants';
import generateHashedString from '../util/generateHashedString';
import { IStatus, IResetPasswordOnFirstLogin } from '../types/type';
import findOrGenerateKey from '../util/findOrGenerateKey';
import envVars from '../util/env-vars';

const { MESSAGES, STATUS_CODE, ROLE_ID } = CONSTANTS;

export const register = async (
  data: Prisma.usersUncheckedCreateInput,
  currentUserId: number
): Promise<IStatus> => {
  try {
    const passwordHash = generateHashedString(data.password);
    const currentUser = await UserRepository.findByValue({
      id: Number(currentUserId)
    });
    if (!currentUser) {
      return {
        status: STATUS_CODE.STATUS_401,
        message: MESSAGES.ERROR.USER.USER_INVALID
      };
    }
    const isUserAlreadyExists = await UserRepository.findByValue({
      email: data.email.toLocaleLowerCase()
    });
    if (isUserAlreadyExists) {
      return {
        status: STATUS_CODE.STATUS_409,
        message: MESSAGES.ERROR.USER.USER_ALREADY_EXISTS
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = {
      email: data.email.toLocaleLowerCase(),
      password: passwordHash,
      created_by: currentUser.email,
      updated_by: currentUser.email
    };
    const user = await UserRepository.create(payload);
    if (user) {
      return {
        status: STATUS_CODE.STATUS_200,
        message: MESSAGES.SUCCESS.USER.USER_CREATE
      };
    } else {
      return {
        status: STATUS_CODE.STATUS_500,
        message: MESSAGES.ERROR.USER.USER_CREATE
      };
    }
  } catch (err) {
    logger.info(`${MESSAGES.ERROR.USER.USER_CREATE}, {cause: ${err}}`);
    return {
      status: STATUS_CODE.STATUS_500,
      message: MESSAGES.ERROR.USER.USER_CREATE
    };
  }
};

export const resetPasswordFirstLogin = async (
  payload: IResetPasswordOnFirstLogin
) => {
  const currentUser = await UserRepository.findByValue({
    email: payload.email.toLocaleLowerCase()
  });
  if (!currentUser) {
    return {
      status: STATUS_CODE.STATUS_400,
      message: MESSAGES.ERROR.USER.USER_NOT_FOUND
    };
  }
  if (!currentUser.isFirstLogin) {
    return {
      status: STATUS_CODE.STATUS_400,
      message: MESSAGES.ERROR.USER.INVALID_FIRST_LOGIN
    };
  }
  if (!bcryptCompareHash) {
    return {
      status: STATUS_CODE.STATUS_400,
      message: MESSAGES.ERROR.USER.INVALID_OLD_PASSWORD
    };
  }
  const passwordHash = generateHashedString(payload.new_password as string);
  const update = await UserRepository.update(
    {
      password: passwordHash,
      isFirstLogin: false
    },
    { id: currentUser.id }
  );
  if (!update) {
    return {
      status: STATUS_CODE.STATUS_500,
      message: MESSAGES.ERROR.USER.USER_UPDATE
    };
  }
  return {
    status: STATUS_CODE.STATUS_200,
    message: { isFirstLogin: update.isFirstLogin }
  };
};

export const login = async (email: string, password: string) => {
  try {
    const key = await findOrGenerateKey();
    const currentUser = await UserRepository.findByValue({
      email: email.toLocaleLowerCase(),
      is_active: true,
      deleted_at: { equals: null }
    });
    if (currentUser === null) {
      return {
        status: STATUS_CODE.STATUS_401,
        message: MESSAGES.ERROR.USER.USER_INACTIVE
      };
    }
    if (bcryptCompareHash(password, currentUser?.password as string)) {
      const payload = {
        userId: currentUser?.id,
        role_id: currentUser?.role_id,
        name: currentUser?.name
      };
      const token = signJWT(
        payload,
        key as string,
        envVars.token.refreshTokenExpiry
      );
      const updateToken = await UserRepository.update(
        { access_token: token },
        { id: currentUser?.id }
      );
      const accessToken = signJWT(
        payload,
        updateToken?.access_token as string,
        envVars.token.accessTokenExpiry
      );
      return {
        status: STATUS_CODE.STATUS_200,
        message: {
          user: currentUser?.id,
          role: currentUser?.role_id,
          name: currentUser?.name,
          isFirstLogin: currentUser?.isFirstLogin
        },
        accessToken
      };
    } else {
      loginRecords.info(
        `email: ${email}, password: ${password}, timestamp: ${new Date()}`
      );
      return {
        status: STATUS_CODE.STATUS_400,
        message: MESSAGES.ERROR.USER.USER_PASSWORD_NOT_MATCH
      };
    }
  } catch (err) {
    logger.info(`Unable to login, { cause: ${err}`);
    return {
      status: STATUS_CODE.STATUS_400,
      message: MESSAGES.ERROR.USER.USER_LOGIN
    };
  }
};

export const remove = async (id: number, userId: number): Promise<IStatus> => {
  const currentUser = await UserRepository.findByValue({ id: userId });
  if (currentUser) {
    const response = await UserRepository.softDelete({ id }, currentUser.email);
    if (response) {
      return {
        status: STATUS_CODE.STATUS_200,
        message: MESSAGES.SUCCESS.USER.USER_DELETE
      };
    }
  }
  return {
    status: STATUS_CODE.STATUS_500,
    message: MESSAGES.ERROR.USER.USER_DELETE
  };
};

export const update = async (
  data: Prisma.usersUncheckedUpdateInput,
  id: number,
  userId: number
): Promise<IStatus> => {
  const currentUser = await UserRepository.findByValue({ id: userId });
  const { password, ...filterData } = data;
  const updatePass = password
    ? { password: generateHashedString(password as string) }
    : null;
  const payload = {
    ...filterData,
    ...updatePass,
    updated_by: currentUser?.email
  };
  const response = await UserRepository.update(payload, { id });
  if (response) {
    return {
      status: STATUS_CODE.STATUS_200,
      message: MESSAGES.SUCCESS.USER.USER_UPDATE
    };
  }
  return {
    status: STATUS_CODE.STATUS_500,
    message: MESSAGES.ERROR.USER.USER_UPDATE
  };
};

export const getAll = async (userId: number) => {
  const currentUser = await UserRepository.findByValue({ id: userId });
  let getAll;
  const selectedQuery = {
    id: true,
    name: true,
    email: true,
    access_token: true,
    phone: true,
    is_active: true,
    role_id: true,
    roles: { select: { id: true, name: true } }
  };
  switch (currentUser?.role_id) {
    case ROLE_ID.ADMIN_ID:
      getAll = await UserRepository.findMany({
        where: {
          role_id: ROLE_ID.ORG_ID,
          deleted_at: null
        },
        select: selectedQuery
      });
      break;
    default:
      getAll = await UserRepository.findMany({
        where: {
          deleted_at: null
        },
        select: selectedQuery
      });
  }
  if (getAll) {
    return {
      status: STATUS_CODE.STATUS_200,
      message: getAll
    };
  }
  return {
    status: STATUS_CODE.STATUS_500,
    message: MESSAGES.ERROR.USER.USER_FETCH_ALL
  };
};
