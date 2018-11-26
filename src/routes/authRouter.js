import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import validator from '../middlewares/validator';

const authRouter = Router();

authRouter.post('/auth/login', validator.validateLogin, AuthController.login);

export default authRouter;
