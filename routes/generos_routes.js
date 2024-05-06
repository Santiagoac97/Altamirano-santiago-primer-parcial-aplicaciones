import express from 'express';
import verificarToken from '../middlewares/auth.js';
import { getPeliculaByGenero } from '../controllers/peliculas_controller.js';

const ruta = express.Router();

ruta.get('/:genero', verificarToken, getPeliculaByGenero);


export default ruta;