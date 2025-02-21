import { Router } from 'express';
import multer from 'multer';

import photo from '../controllers/Photo';
import multerConfig from '../config/multer';

const upload = multer(multerConfig);

const router = new Router();

router.post('/', upload.single('photo'), photo.create);

export default router;
