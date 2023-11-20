import { Router } from 'express'
import * as employes from "../controllers/empleados.controller.js";
import { verifytoken } from '../middlewares/authJWT.js';
const router = Router()

router.get('/empleados', verifytoken, employes.consultAllEmployees);

router.post('/empleados', verifytoken, employes.agregarEmpleado);

export default router;