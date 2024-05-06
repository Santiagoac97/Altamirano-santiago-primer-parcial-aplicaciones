import express from "express"
import path from "path"
import mongoose from "mongoose"
import "dotenv/config"
import PeliculasRoutes from "./routes/peliculas_routes.js"
import auth from "./routes/auth.js"
import user_routes from "./routes/usuarios_routes.js"
import generosRoutes from "./routes/generos_routes.js"

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("conectado a base de datos"))
    .catch(() => console.log("error al conectar"))

const app = express()
const __dirname = path.resolve();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
app.use("/peliculas", PeliculasRoutes)
app.use("/genero", generosRoutes)
app.use("/login", auth)
app.use("/users", user_routes)
app.use((req, res) => {
    res.status(404).send('Ruta no encontrada');
});



const port = process.env.PORT || 3002
app.listen(port)