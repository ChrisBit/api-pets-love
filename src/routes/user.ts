import express from 'express'
import {
  create,
  getUser,
  getUsers,
  updateUser,
  updateRole,
} from '../useCases/userCases/userController'
import { createGoogleCloudUploader } from '../middlewares/googleCloudUploader'
import { verifyToken } from '../middlewares/auth'

const uploadImages = createGoogleCloudUploader('images')

const router = express.Router()

router.post('/user/', create) // CREATE USER

router.put('/user/role', [verifyToken], updateRole) // CREATE USER

// This route need verifyToke
router.put('/user/', [verifyToken, uploadImages], updateUser) // UPDATE USER

router.get('/users/', [verifyToken], getUsers) // GET USERS

router.get('/user/', getUser) // GET USER

// router.delete('/user', [verifyToken, verifyRole_Admin], Delete); // DELETE USERS

export default router
