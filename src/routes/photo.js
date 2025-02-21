import { Router } from 'express';
import photo from '../controllers/Photo';


const router = new Router();

router.post('/', photo.create);

export default router;
