import express from 'express'
import userController from '../controllers/userController.js'
import userMiddleware from '../middleware/userMiddleware.js'

const userRouter = express.Router();

userRouter.get('/', userController.getUsers);
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.delete('/delete', userController.deleteUser);


export default userRouter