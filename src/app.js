import express from 'express';
import publicRoutes from './routes/public.routes.js';
import auth from './routes/auth.routes.js';
import user from './routes/user.routes.js';
import empleado from './routes/empleados.routes.js';
import cors from 'cors'
// var cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json())

app.use('/api/public', publicRoutes)
app.use('/api/auth', auth)
app.use('/api', user)
app.use('/api', empleado)
// app.use('/api', usersRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    })
})

export default app;