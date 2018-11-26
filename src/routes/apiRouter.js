import { Router } from 'express';
import authRouter from './authRouter';
import thumbnailRouter from './thumbnailRoutes';
import jsonPatchRouter from './jsonPatchRouter';

const apiRouter = Router();

apiRouter.use('/api/v1', authRouter, thumbnailRouter, jsonPatchRouter);

export default apiRouter;
