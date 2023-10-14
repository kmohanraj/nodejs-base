import express from 'express';
import * as UserValidator from '../helper/user/user.body.validator';
import { userParamsValidator } from '../helper/user/user.params.validator';

import genericErrorMessage, {
  IErrorStatus
} from '../../util/genericErrorMessage';
import CONSTANTS from '../../config/constants';
import * as UserRepository from '../../repository/users.repository';

export const loginValidator = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<unknown> => {
  const { error } = UserValidator.loginBodyValidator(req.body);
  if (error) {
    return genericErrorMessage(
      CONSTANTS.STATUS_CODE.STATUS_400 as IErrorStatus,
      error.details[0].message,
      res
    );
  } else {
    const user = await UserRepository.findOne({
      email: req.body.email.toLocaleLowerCase()
    });
    if (!user) {
      return genericErrorMessage(
        CONSTANTS.STATUS_CODE.STATUS_400 as IErrorStatus,
        'User record not Found',
        res
      );
    } else {
      return next();
    }
  }
};

export const resetPasswordFirstLogin = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): unknown => {
  const { error } = UserValidator.resetPassword(req.body);
  if (error) {
    return res.status(CONSTANTS.STATUS_CODE.STATUS_400).json(error.details);
  }
  return next();
};

export const registerValidator = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<unknown> => {
  const { error } = UserValidator.regValidator(req.body);
  if (error) {
    return genericErrorMessage(
      CONSTANTS.STATUS_CODE.STATUS_400 as IErrorStatus,
      error.details[0].message,
      res
    );
  } else {
    const { error: errorOnParams } = userParamsValidator(req.params);
    if (errorOnParams) {
      return genericErrorMessage(
        CONSTANTS.STATUS_CODE.STATUS_400 as IErrorStatus,
        errorOnParams.details[0].message,
        res
      );
    } else {
      const user = await UserRepository.findOne({
        id: Number(req.params.userId),
        email: req.body.email.toLocaleLowerCase()
      });
      if (!user) {
        return next();
      } else {
        return res.sendStatus(CONSTANTS.STATUS_CODE.STATUS_409);
      }
    }
  }
};

export const updateValidator = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): unknown => {
  const { error } = UserValidator.updateValidator(req.body);

  if (error) {
    return res.status(CONSTANTS.STATUS_CODE.STATUS_400).json(error.details);
  } else {
    return next();
  }
};
