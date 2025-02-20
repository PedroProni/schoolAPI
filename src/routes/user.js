import { Router } from 'express';
import user from '../controllers/User';
import loginRequired from '../middleware/loginRequired';

const router = new Router();

/*
 Feitas somente para teste
  router.get("/", loginRequired, user.index);
  router.get("/find", loginRequired, user.show);
*/

router.post("/", user.create);
router.put("/", loginRequired, user.update);
router.delete("/", loginRequired, user.delete);

export default router;
