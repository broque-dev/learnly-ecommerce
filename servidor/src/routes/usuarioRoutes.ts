import { Router } from 'express';
import { crearCuenta, iniciarSesion, obtenerPerfil, actualizarPerfil } from '../controllers/usuarioController';

const router = Router();

router.post('/crear-cuenta', crearCuenta);
router.post('/iniciar-sesion', iniciarSesion);

// Ruta protegida para obtener el perfil
router.get('/perfil', obtenerPerfil);
router.put('/actualizar', actualizarPerfil);


export default router;
