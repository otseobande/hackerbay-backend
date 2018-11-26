import { Router } from 'express';
import ThumbnailController from '../controllers/ThumbnailController';
import validator from '../middlewares/validator';
import authorize from '../middlewares/authorize';

const thumbnailRoutes = Router();

thumbnailRoutes.post(
  '/create-thumbnail',
  authorize,
  validator.validateImageUrl,
  ThumbnailController.convertToThumbnail,
);

export default thumbnailRoutes;
