import { Router } from "express";
import { consultar } from "../controllers/index.controller.js";

const router = Router()

router.get('/prueba', consultar);

export default router;