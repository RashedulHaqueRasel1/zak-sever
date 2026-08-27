import express from 'express';
import { DevelopmentControllers } from './development.controller';
import validateRequest from '../../middlewares/validateRequest';
import { DevelopmentValidation } from './development.validation';
import { isAdmin, protect } from '../../middlewares/auth.middleware';

const router = express.Router();

router.post(
  '/',
  protect,
  isAdmin,
  validateRequest(DevelopmentValidation.createDevelopmentValidationSchema),
  DevelopmentControllers.createDevelopment
);

router.get('/', DevelopmentControllers.getAllDevelopments);

router.get('/:id', DevelopmentControllers.getDevelopmentById);

router.patch(
  '/:id',
  protect,
  isAdmin,
  validateRequest(DevelopmentValidation.updateDevelopmentValidationSchema),
  DevelopmentControllers.updateDevelopment
);

router.delete('/:id', protect, isAdmin, DevelopmentControllers.deleteDevelopment);

export default router;
