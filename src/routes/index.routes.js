import { Router } from "express";
import { consultar } from "../controllers/index.controller.js";

const router = Router()

router.get('/', consultar);

export default router;