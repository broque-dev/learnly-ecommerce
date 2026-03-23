import { Request, Response } from 'express';
import Curso from '../models/curso';

// Listar todos los cursos
export const listarCursos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const cursos = await Curso.find().populate('instructor', 'nombre correo');
    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({
      message: 'Error al listar los cursos',
      error,
    });
  }
};
