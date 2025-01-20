import { Router } from 'express'
import * as rolPago from "../controllers/rol-pago.controller.js";
import { verifytoken } from '../middlewares/authJWT.js';
const router = Router()

router.get('/rol_pago/generarRolesPago', verifytoken, rolPago.generarRolesPago);
router.post('/rol_pago/consultarRolesPago', verifytoken, rolPago.consultarRolesPago);
router.post('/rol_pago/consultarRolEmpleado', verifytoken, rolPago.consultarRolEmpleado);

export default router;