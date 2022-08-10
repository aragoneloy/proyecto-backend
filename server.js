const express = require('express');
const Contenedor = require('./Contenedor.js')


const app = express();
const contenedor = new Contenedor('./DB/productos.json');

const rndmNum = Math.floor(Math.random() * 3) + 1

app.get('/productos', async (req, res) => {
   
    res.send(await contenedor.getAll()) 
    
})

app.get('/productoRandom', async (req, res) => {
    res.send(await contenedor.getById(rndmNum))
    
})



const PORT = 8080;
app.get('/', (req, res) => {
    res.send('Hello World!');
});


const server = app.listen(PORT, () =>  {
    console.log('servidor corriendo en el puerto 8080');
} );
