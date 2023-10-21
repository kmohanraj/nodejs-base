import express from 'express';
import UserController from './api/v1/users.controller';
import authorization from '../middleware/Authorization/authorization';
import verifyToken from '../middleware/Authorization/verifyToken';
import { UserValidator } from '../validator';

const router = express.Router();
const verifyAuth = [authorization.isTokenFound, verifyToken];

// Users Routes
router.get(
  '/user/:userId/register',
  verifyAuth,
  UserValidator.registerValidator,
  UserController.register
);
router.post('/user/login', UserValidator.loginValidator, UserController.login);
router.get('/user/:userId/getAll', verifyAuth, UserController.getAll);
router.post(
  '/user:userId/resetPasswordFirstLogin',
  verifyAuth,
  UserController.resetPasswordAtFirst
);
router.delete('/:userId/user/delete', verifyAuth, UserController.remove);
router.put(
  '/:userId/user/update',
  verifyAuth,
  UserValidator.updateValidator,
  UserController.update
);

export default router;
