import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import usuarioRoutes from './routes/usuarioRoutes';
import htmlRoutes from './routes/htmlRoutes';
import cursoRoutes from './routes/cursoRoutes';

const app: Application = express();

// Middleware de configuración
app.use(cors());
app.use(express.json());

const PORT = 3000; 
const DB_URL = 'mongodb://localhost:27017/learnly'; 

// Conexión a MongoDB
mongoose.connect(DB_URL)
   .then(() => console.log('Conexión exitosa a MongoDB'))
   .catch(error => console.error('Error al conectar con MongoDB:', error.message));

// Middleware para archivos estáticos
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use('/src/js', express.static(path.join(__dirname, '..', 'src', 'js')));

// Rutas
app.use('/', htmlRoutes);
app.use('/', usuarioRoutes);
app.use('/api/curso', cursoRoutes);

app.listen(PORT, () => {
   console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
