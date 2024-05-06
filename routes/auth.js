import Usuario from "../models/usuario_model.js"
import bcrypt from "bcrypt"
import express from "express"
import jwt from "jsonwebtoken"
import "dotenv/config"

const ruta  = express.Router()

ruta.post('/', (req,res) =>{
    console.log("Datos recibidos:", req.body);
    Usuario.findOne({email: req.body.email})
    .then(data => {
        console.log("Datos encontrados en la base de datos:", data);
        
        if(data){
            const passwordValido = bcrypt.compareSync(req.body.password, data.password);
            console.log("Contraseña almacenada:", data.password);
            console.log("Contraseña válida:", passwordValido);
            if (!passwordValido) return res.status(400).json({ msj: "Contraseña incorrecta" });
            const jwToken = jwt.sign({
                usuario: {
                    _id:data._id,
                    nombre: data.nombre,
                    email: data.email
                }
            }, process.env.SEED, {expiresIn: process.env.EXPIRATION})
            res.json({
                usuario: {
                    _id: data._id,
                    nombre: data.nombre,
                    email: data.email
                }, jwToken
            })
        } else {
            res.status(400).json({msj:"email incorrecto"})
        }
    })
})

export default ruta;