import { Router } from 'express';
import photo from '../controllers/Photo';
import loginRequired from '../middleware/loginRequired';


const router = new Router();

router.post('/', loginRequired, photo.create);

export default router;
