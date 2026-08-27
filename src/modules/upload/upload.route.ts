import { Router } from 'express';
import { imageMemoryUpload } from '../../middlewares/multer.middleware';
import { UploadControllers } from './upload.controller';
import { isAdmin, protect } from '../../middlewares/auth.middleware';

const router = Router();
router.post('/images', protect, isAdmin, imageMemoryUpload.array('images', 30), UploadControllers.uploadImages);
export default router;
