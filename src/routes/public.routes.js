import { Router } from "express";
import { consultarPuestos, consultarRoles } from "../controllers/public.controller.js";

const router = Router()

router.get('/puestos', consultarPuestos);

router.get('/roles', consultarRoles);

export default router;