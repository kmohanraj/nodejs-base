import express from 'express';
import CONSTANTS from '../../config/constants';
import * as RoleRepo from '../../repository/roles.repository';

class Authorization {
  isTokenFound(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): express.Response | unknown {
    if (!req.headers['authorization'])
      return res
        .status(CONSTANTS.STATUS_CODE.STATUS_401)
        .json({ info: CONSTANTS.AUTHORIZATION_RESPONSES.TOKEN_NOT_FOUND });
    else return next();
  }

  async superAdmin(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const getRoles = await RoleRepo.getRoleName({
      name: CONSTANTS.ROLE_ID.SUPER_ADMIN
    });
    req.body.allowedRole = [getRoles?.id];
    return next();
  }

  async orgAdmin(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const getRoles = await RoleRepo.getRoleName({
      name: CONSTANTS.ROLE_ID.ORG_ADMIN
    });
    console.log('getRoles', getRoles);
    req.body.allowedRole = [getRoles?.id];
    return next();
  }

  async Employee(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const getRoles = await RoleRepo.getRoleName({
      name: CONSTANTS.ROLE_ID.EMPLOYEE
    });
    req.body.allowedRole = [getRoles?.id];
    return next();
  }
}
export default new Authorization();
