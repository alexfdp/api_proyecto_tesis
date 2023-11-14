import { Router } from 'express'
import * as authCtrl from "../controllers/auth.controller.js";
const router = Router()

router.post('/', authCtrl.autenticar);

export default router;