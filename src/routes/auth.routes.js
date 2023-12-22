import { Router } from 'express'
import * as authCtrl from "../controllers/auth.controller.js";
import { verifytoken } from '../middlewares/authJWT.js';
const router = Router()

router.post('/', authCtrl.autenticar);
router.put('/changePass', verifytoken, authCtrl.changePass)

export default router;