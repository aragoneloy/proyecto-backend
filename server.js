
// ---------------------------- Módulos ----------------------------
const express = require('express');
const { Router } = express;
const morgan = require('morgan')


// ---------------------------- instancias del servidor ----------------------------
const app = express();
const routerProductos = require('./src/routes/productos.routes.js')

// ---------------------------- Middlewares ----------------------------
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));





// ---------------------------- Rutas ----------------------------
app.use('/api/productos', routerProductos);






// ---------------------------- Servidor ----------------------------
const PORT = 8080;
app.get('/', (req, res) => {
    res.send('Hello World!');
});


const server = app.listen(PORT, () =>  {
    console.log('servidor corriendo en el puerto 8080');
} );
