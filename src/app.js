import express from 'express';
// import usersRoutes from './routes/users.routes.js';
import pruebaRoutes from './routes/index.routes.js';

const app = express();

app.use(express.json())

app.use(pruebaRoutes)
// app.use('/api', usersRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    })
})

export default app;