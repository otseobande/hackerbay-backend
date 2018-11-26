import { Router } from 'express';
import authRouter from './authRouter';

const apiRouter = Router();

apiRouter.use('/api/v1', authRouter);

export default apiRouter;
