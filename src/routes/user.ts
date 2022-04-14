import express from 'express';
import {
  login,
  create,
  update,
  Delete,
  getUser,
  getUsers,
  resetPassword,
  forgotPassword,
  getDashboardData,
  getUsersTypeRole,
} from '../useCases/userCases/userController';
import uploadImage from '../middlewares/awsStorageImage';
import { verificaToken, verificaRole_Admin } from '../middlewares/auth';

const router = express.Router();

router.post('/login/', login); // POST USER

router.post('/user/', create); // POST USER

router.get('/users/', getUsers); // GET USERS

router.get('/user', getUser); // GET USER

router.get('/user/dashboard', [verificaToken], getDashboardData); // GET USER

router.post('/user/usersTypeRole', getUsersTypeRole); // GET USER

router.delete('/user', [verificaToken, verificaRole_Admin], Delete); // DELETE USERS

router.put('/user', [verificaToken, uploadImage], update); // PUT USER

router.post('/forgot-password', forgotPassword); // POST SEND EMAIL FORGOT PASSWORD

router.post('/reset-password', [verificaToken], resetPassword); // POST RESET PASSWORD PASSWORD

export default router;
