import { Router } from 'express';
import uploadController from './../controllers/upload.controller.js';
import { upload } from './../utils/multer.js';

const router = Router();

router.post('/upload', upload.single('file'), uploadController.handleUpload);
router.get('/files', uploadController.listFiles);
router.delete('/files/:filename', uploadController.deleteFile);
router.post('/files/:filename/duplicate', uploadController.duplicateFile);

export default router;
