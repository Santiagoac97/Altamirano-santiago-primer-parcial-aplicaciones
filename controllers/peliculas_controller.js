import Pelicula from "../models/pelicula_model.js"
import mongoose from 'mongoose'

async function getPeliculas(req, res){
    try {
        const peliculas = await Pelicula.find();
        res.status(200).json(peliculas);
    } catch (error) {
        res.status(500).json ({ message: error.message})
    }
}

async function getPeliculaById(req, res){
    try{ 
        const pelicula = await Pelicula.findById(req.params.id)
        if (pelicula){
            res.status(200).json(pelicula)
        } else{
            res.status(404).json({ message: "Pelicula no encontrada"})
        }
    } catch (error){
        res.status(500).json ({ message: error.message})
    }
}

async function createPelicula(body){
    let pelicula = new Pelicula({
        titulo: body.titulo,
        genero: body.genero,
        id: body.id,
        año: body.año,
        descripcion: body.descripcion,
        director: body.director,
        imagen: body.imagen
    })

    try {
        const nuevaPelicula = await pelicula.save()
        return nuevaPelicula;
      } catch (error) {
        throw new Error(error.message);
      }
    }

    async function updatePelicula(id, body){
        let peliculaActualizada = await Pelicula.findByIdAndUpdate(id, {
            $set: {
                titulo: body.titulo,
                director: body.director
            }
        }, {new: true})
        console.log('Pelicula actualizada correctamente')
        return peliculaActualizada;
        
    }
    

    async function deletePelicula(req, res){
        try {
            const pelicula = await Pelicula.findByIdAndDelete(req.params.id)
            if (pelicula){
                res.status(200).json({ message: "Pelicula eliminada correctamente"})
            } else{
                res.status(404).json({message: "Pelicula no encontrada"})
            }
        } catch(error) {
            res.status(500).json({ message: error.message})
        }
    }

    async function getPeliculaByGenero(req, res){
        try {
            const genero = req.params.genero;
            const peliculas = await Pelicula.find({ genero })
            
            res.status(200).json(peliculas);
        } catch(error){
            res.status(500).json({ message: error.message })
        }
    }

    async function getPeliculasByTitulo(req, res) {
        try {
            const titulo = req.params.titulo;
            const peliculas = await Pelicula.find({ titulo: { $regex: new RegExp(titulo, "i") } });
            res.status(200).json(peliculas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async function getPeliculasByDirector(req, res) {
        try {
            const director = req.params.director;
            const peliculas = await Pelicula.find({ director });
            res.status(200).json(peliculas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    async function getPeliculasOrdenadas(req,res){
        try {
            const { campo, orden} = req.query
            const opcionesOrden = {}
            opcionesOrden[campo] = orden === 'desc' ? -1 : 1;
            const peliculas = await Pelicula.find().sort(opcionesOrden)
            res.status(200).json(peliculas)
        } catch (error){
            res.status(500).json({ message: error.message})
        }
    }

    async function getPeliculasPaginadas(req, res) {
        try {
            const { inicio, fin } = req.query;
            const startIndex = parseInt(inicio) || 0; 
            const limit = parseInt(fin) || 10; 
    
            const peliculas = await Pelicula.find().skip(startIndex).limit(limit);
            
            res.status(200).json(peliculas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
export {getPeliculas, getPeliculaById, createPelicula, updatePelicula,deletePelicula, getPeliculaByGenero, getPeliculasByTitulo, getPeliculasByDirector, getPeliculasOrdenadas, getPeliculasPaginadas}
