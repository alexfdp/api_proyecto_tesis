import { Router } from 'express'
import * as us from "../controllers/usuarios.controller.js";
import { verifytoken } from '../middlewares/authJWT.js';
const router = Router()

router.get('/usuario', verifytoken, us.consultarAllUsers);
router.put('/usuario', verifytoken, us.updateUsuario);

export default router;