import mongoose from "mongoose";

const peliculaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required:true
    },
    genero: {
        type: String,
        required:true
    },
    año: {
        type: Number,
        required:true
    },
    descripcion: {
        type: String,
    },
    director: {
        type: String,
    },
    imagen: {
        type: String,
    },
})

export default mongoose.model("Pelicula", peliculaSchema)