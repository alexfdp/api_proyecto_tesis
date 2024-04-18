import { Router } from 'express'
import * as prueba from "../controllers/prueba.controller.js";

const router = Router()

router.post('/', prueba.validarOPR);

export default router;