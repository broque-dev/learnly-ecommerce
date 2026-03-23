import { Router } from 'express';
import { sendHtmlPage } from '../controllers/htmlController';

const router = Router();

const pages = [
    'inicio',
    'menu',
    'informacion',
    'cursos',
    'rutas',
    'planes',
    'soporte',
    'pagos',
    'crear-cuenta',
    'iniciar-sesion',
    'cuenta',
    'progreso',
    'apartado_cinema',
    'apartado_html',
    'apartado_javascript',
    'apartado_python',
    'apartado_mysql',
    'apartado_nodejs',
    'apartado_sql',
    'rutasHtml',
    'rutasCine',
    'rutasJS',
    'rutasPython',
    'examenHTML',
    'examenCine',
    'examenJS',
    'examenPython',
    'videoHtml',
    'videoCine',
    'videoJS',
    'videoPython',
    'cuestionarioCin',
    'cuestionarioH',
    'cuestionarioJ',
    'cuestionarioP',
    'a'
];

pages.forEach((page) => {
    router.get(`/${page}.html`, sendHtmlPage(page));
});

export default router;
