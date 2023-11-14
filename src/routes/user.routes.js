import { Router } from 'express'
import * as us from "../controllers/user.controller.js";
import { verifytoken } from '../middlewares/authJWT.js';
const router = Router()

// router.get('/user/:id', verifytoken, us.consultarDataUser);
router.get('/user', verifytoken, us.consultarDataUser);

export default router;