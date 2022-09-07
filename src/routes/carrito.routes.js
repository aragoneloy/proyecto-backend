const express = require('express')
const routerCarrito = express.Router();
const Carrito = require('../../Carrito.js')
const Contenedor = require('../../Contenedor.js')
//DB
const carrito = new Carrito('./DB/carritos.json')
const contenedor = new Contenedor('./DB/productos.json')


routerCarrito.post('/', async (req, res) => {
    
    await carrito.newCarrito( {productos:[]})
    
    const objs = await carrito.getAll()
    const idUltimoCarrito = objs[objs.length - 1].id

    res.status(201).json({msg: 'Carrito creado!', id: idUltimoCarrito })
});

routerCarrito.delete('/:id', async (req, res) => {
    const id = req.params.id;
    res.status(201).json(await carrito.deleteById(id))
});

routerCarrito.get('/:id/productos', async (req, res) => {
    const id = req.params.id;
    res.status(200).json(await carrito.getProdAgregadosById(id))
});

routerCarrito.post('/:id/productos/:id_prod', async (req, res) => {
    const id = req.params.id;
    const id_prod = req.params.id_prod
    const prod = await contenedor.getById(id_prod)
    
    res.status(200).json(await carrito.saveProductoById(prod, id))
})
routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    const id = req.params.id;
    const id_prod = req.params.id_prod

    res.status(200).json(await carrito.deleteById(id_prod, id))
})

module.exports = routerCarrito;