import { Router } from 'express'
import * as rolPago from "../controllers/rol-pago.controller.js";
import { verifytoken } from '../middlewares/authJWT.js';
const router = Router()

router.post('/rol_pago/generarRolesPago', verifytoken, rolPago.generarRolesPago);

export default router;