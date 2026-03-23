import express from 'express';
import { listarCursos } from '../controllers/cursoController';

const router = express.Router();

// Ruta para crear un curso
router.get('/listar', listarCursos);

export default router;
