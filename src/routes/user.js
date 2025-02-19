import { Router } from 'express';
import user from '../controllers/User';

const router = new Router();

router.get('/', user.index);
router.get('/:id', user.show);
router.post('/', user.create);
router.put('/:id', user.update);
router.delete('/:id', user.delete);

export default router;
