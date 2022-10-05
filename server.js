
// ---------------------------- Módulos ----------------------------
import express from 'express'
import morgan from "morgan";
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import * as dotenv from 'dotenv' 

dotenv.config()


// ---------------------------- instancias del servidor ----------------------------
const app = express();
import routerProductos from './src/routes/productos.routes.js'
import routerCarrito from './src/routes/carrito.routes.js';

// ---------------------------- Middlewares ----------------------------
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, "public")));


// ---------------------------- Rutas ----------------------------
app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);


// -----------------    ----------- Servidor ----------------------------
let PORT = process.env.PORT || 8080;
app.get('/', (req, res) => {
    res.send('Hello World!');
});


const server = app.listen(PORT, () =>  {
    console.log(`servidor corriendo en el puerto ${PORT}`);
} );
