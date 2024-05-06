import express from "express"
import { getPeliculas, getPeliculaById, createPelicula, updatePelicula, deletePelicula, getPeliculasByDirector,getPeliculasByTitulo, getPeliculasOrdenadas, getPeliculasPaginadas } from "../controllers/peliculas_controller.js";
import verificarToken from '../middlewares/auth.js';

const ruta = express.Router();


ruta.get('/ordenadas', getPeliculasOrdenadas)
ruta.get('/paginadas', getPeliculasPaginadas);
ruta.get("/", verificarToken, getPeliculas);
ruta.get("/:id", getPeliculaById);
ruta.post("/",  createPelicula);
ruta.put("/:id", (req, res) => {
    let body = req.body;
    let resultado = updatePelicula(req.params.id, body);
    resultado
        .then((user) => { res.status(201).json(user) })
        .catch((error) => { res.status(400).json(error) })
})
ruta.delete("/:id", deletePelicula);
ruta.get('/titulo/:titulo', getPeliculasByTitulo);
ruta.get('/director/:director', getPeliculasByDirector);




export default ruta;

// todas http://localhost:3000/peliculas
// id http://localhost:3000/peliculas/6636f02fd397fec2642ceb97
// update http://localhost:3000/peliculas/6636f02fd397fec2642ceb97 {
//    "director": "ejemplo" }
// para delete http://localhost:3000/peliculas/id
// filtros http://localhost:3000/peliculas/director/Christopher Nolan 
// http://localhost:3000/peliculas/titulo/matrix
// ordenamiento desc http://localhost:3000/peliculas/ordenadas?campo=año&orden=desc cualquier otro te trae los años en asc http://localhost:3000/peliculas/ordenadas
// paginado http://localhost:3000/peliculas/paginadas?inicio=3&fin=1 donde "inicio" 
// ruta genero http://localhost:3000/genero/accion
