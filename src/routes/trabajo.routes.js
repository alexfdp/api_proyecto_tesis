import { Router } from 'express'
import * as trabajo from "../controllers/trabajo.controller.js";
import { verifytoken } from '../middlewares/authJWT.js';
const router = Router()

router.post('/trabajo/horarioById', verifytoken, trabajo.consultarHorarioById);
router.put('/trabajo/udateHorario', verifytoken, trabajo.updateHorario);
router.post('/trabajo/consultartrabajo', verifytoken, trabajo.consultarHorasTrabajo);
router.put('/trabajo/generarRegistros', verifytoken, trabajo.generarRegistros);
router.put('/trabajo/updateHorasTrabajadas', verifytoken, trabajo.updateHorasTrabajadas);

export default router;