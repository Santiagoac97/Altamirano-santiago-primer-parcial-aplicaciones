import jwt from "jsonwebtoken"
import "dotenv/config"

const verificarToken = (req, res, next) =>{
    let token = req.get('auth');

    jwt.verify(token, process.env.SEED, (error,decoded) => {
        if(error){
            return res.status(400).json({ message: 'Necesitas estar autenticado'})
        }
        req.usuario = decoded.usuario;
        next()
    })
}
export default verificarToken;