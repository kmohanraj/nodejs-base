import express from 'express';
import jwt from 'jsonwebtoken';
import { users } from '@prisma/client';
import CONSTANTS from '../../config/constants';
import * as UsersRepository from '../../repository/users.repository';
import RefreshAccessToken from '../../util/refreshAccessToken';

export default async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<unknown> => {
  const userData = await UsersRepository.findByValue({
    id: Number(req.params.userId)
  });
  if (!userData) {
    return res
      .status(CONSTANTS.STATUS_CODE.STATUS_400)
      .json({ info: CONSTANTS.AUTHORIZATION_RESPONSES.USER_NOT_FOUND });
  }
  if (
    req.body.allowedRole &&
    !req.body.allowedRole.includes(userData.role_id)
  ) {
    return res.sendStatus(CONSTANTS.STATUS_CODE.STATUS_401);
  }

  return jwt.verify(
    req.headers['authorization'] as string,
    userData.access_token as string,
    async (err, data) => {
      if (err) {
        const refreshTokenData = await RefreshAccessToken(userData as users);
        if (refreshTokenData === CONSTANTS.UTILS.REFRESH_TOKEN_EXPIRED) {
          return res.sendStatus(CONSTANTS.STATUS_CODE.STATUS_401);
        } else {
          res.setHeader('authorization', refreshTokenData as string);
          return next();
        }
      }
      if (data) {
        return next();
      }
    }
  );
};
