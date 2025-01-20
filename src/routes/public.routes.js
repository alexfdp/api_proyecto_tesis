import { Router } from "express";
import { consultarCargos, consultarRoles } from "../controllers/public.controller.js";

const router = Router()

router.get('/cargos', consultarCargos);

router.get('/roles', consultarRoles);

export default router;