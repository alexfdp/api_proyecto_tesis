import { Router } from 'express'
import * as mail from  '../controllers/email.controller.js'
import { verifytoken } from '../middlewares/authJWT.js';
const router = Router()

router.post('/email', mail.searchEmail)

export default router;