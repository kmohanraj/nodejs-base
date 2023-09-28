import express from 'express';
import * as UserService from '../../../services/users.service';

class UsersController {
  async login(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> {
    const { email, password } = req.body;
    const loginData = await UserService.login(email, password);
    if (loginData.accessToken) {
      res.setHeader('authorization', loginData.accessToken as string);
    }
    return res.status(loginData.status).json({ info: loginData.message });
  }

  async resetPasswordAtFirst(req: express.Request, res: express.Response) {
    const resetPasswordStatus = await UserService.resetPasswordFirstLogin(
      req.body
    );
    return res
      .status(resetPasswordStatus.status)
      .json({ info: resetPasswordStatus.message });
  }

  async register(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> {
    const { userId: currentUserId } = req.params;
    const registerResult = await UserService.register(
      req.body,
      Number(currentUserId)
    );
    return res
      .status(registerResult.status)
      .json({ info: registerResult.message });
  }

  async update(req: express.Request, res: express.Response) {
    const { id, data } = req.body;
    delete data.allowedRole;
    const response = await UserService.update(
      data,
      id,
      Number(req.params.userId)
    );
    return res.status(response.status).json({ info: response.message });
  }

  async remove(req: express.Request, res: express.Response) {
    const { id } = req.body;
    const removeData = await UserService.remove(id, Number(req.params.userId));
    return res.status(removeData.status).json({ info: removeData.message });
  }

  async getAll(req: express.Request, res: express.Response) {
    const { userId: currentUserId } = req.params;
    const users = await UserService.getAll(Number(currentUserId));
    return res.status(users.status).json({ info: users.message });
  }
}

export default new UsersController();
