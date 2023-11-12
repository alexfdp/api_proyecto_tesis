import express from 'express';
import pruebaRoutes from './routes/index.routes.js';
import auth from './routes/auth.routes.js';
import cors from 'cors'
// var cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json())

app.use('/prueba', pruebaRoutes)
app.use('/api/auth', auth)
// app.use('/api', usersRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    })
})

export default app;