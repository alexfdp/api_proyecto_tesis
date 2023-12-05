import { Router } from "express";
import { consultarPuestos } from "../controllers/public.controller.js";

const router = Router()

router.get('/puestos', consultarPuestos);

export default router;