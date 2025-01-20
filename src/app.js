import express from 'express';
import publicRoutes from './routes/public.routes.js';
import auth from './routes/auth.routes.js';
import user from './routes/user.routes.js';
import usuarios from './routes/usuarios.routes.js'
import empleado from './routes/empleados.routes.js';
import email from './routes/email.routes.js';
import prueba from './routes/prueba.routes.js';
import trabajo from './routes/trabajo.routes.js';
import rolpago from './routes/rol-pago.routes.js';
import cors from 'cors'
// var cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json())

app.use('/api/public', publicRoutes)
app.use('/api/auth', auth)
app.use('/api/prueba', prueba)
app.use('/api', user)
app.use('/api', empleado)
app.use('/api', usuarios)
app.use('/api', email)
app.use('/api', trabajo)
app.use('/api', rolpago)

app.use('/api/pri', (req, res, next) => {
    res.status(200).json({
        message: 'Mensake de ok de api'
    })
});
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    })
})

export default app;