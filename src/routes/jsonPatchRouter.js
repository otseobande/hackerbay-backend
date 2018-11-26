import { Router } from 'express';
import JsonPatchController from '../controllers/JsonPatchController';
import validator from '../middlewares/validator';
import authorize from '../middlewares/authorize';

const jsonPatchRouter = Router();

jsonPatchRouter.post(
  '/json-patch',
  authorize,
  validator.validatePatch,
  JsonPatchController.patchJson,
);

export default jsonPatchRouter;
