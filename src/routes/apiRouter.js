import { Router } from 'express';
import authRouter from './authRouter';
import thumbnailRouter from './thumbnailRoutes';

const apiRouter = Router();

apiRouter.use('/api/v1', authRouter, thumbnailRouter);

export default apiRouter;
