import express from 'express';
import cors from 'cors';
import connectDB from './services/dbService.js';


import playerRoutes from './routes/playerRoutes.js'

import errorMiddleware from './middleware/errorMiddleware.js';


import { PORT, FRONT_URL } from './config/env.js';

import jwt from 'jsonwebtoken';

// Conectar a la base de datos
connectDB();

const app = express();

app.set("secretKey", "1863")

app.use(cors({
  origin: FRONT_URL, // Cambia esto por la URL de tu frontend desde la variable de entorno
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'x-access-token'], // Headers permitidos
}));



//app.use(cors());
app.use(express.json());
//app.use('/record', recordRoutes);
//app.use('/record', verifyToken, recordRoutes);

//app.use('/user', userRoutes);

app.use('/clubPlayers', playerRoutes);

// Middleware de manejo de errores
app.use(errorMiddleware);

function verifyToken(req, res, next) {
  jwt.verify(req.headers["x-access-token"], req.app.get("secretKey"), function (err, payload) {
    if (err) {
      res.json({ message: err.message })
    } else {
      console.log("Payload", payload)
      req.body.userId = payload.userId
      next()
    }
  })
}

app.verifyToken = verifyToken

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
