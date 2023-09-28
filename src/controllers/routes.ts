import express from 'express';
import UserController from './api/v1/users.controller';
import authorization from '../middleware/Authorization/authorization';
import verifyToken from '../middleware/Authorization/verifyToken';

const router = express.Router();

const verifyAuth = [authorization.isTokenFound, verifyToken];

// Users Routes
router.get('/user/:userId/register', UserController.register);
router.post('/user/login', UserController.login);
router.get('/user/:userId/getAll', verifyAuth, UserController.getAll);
router.post(
  '/user:userId/resetPasswordFirstLogin',
  UserController.resetPasswordAtFirst
);
router.delete('/:userId/user/delete', UserController.remove);
router.put('/:userId/user/update', UserController.update);

export default router;
