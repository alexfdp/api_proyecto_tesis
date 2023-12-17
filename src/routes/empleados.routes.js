import { Router } from 'express'
import * as employes from "../controllers/empleados.controller.js";
import { verifytoken } from '../middlewares/authJWT.js';
const router = Router()

router.get('/empleados', verifytoken, employes.consultAllEmployees);

router.post('/empleados', verifytoken, employes.agregarEmpleado);

router.post('/empleados/validuser', verifytoken, employes.leerUser);

router.put('/empleados', verifytoken, employes.actualizarEmpleado);

router.put('/empleados/estado', verifytoken, employes.updateEstado);

export default router;