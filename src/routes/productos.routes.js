const express = require('express')
const routerProductos = express.Router();
const Contenedor = require('../../Contenedor.js')

//DB
const contenedor = new Contenedor('./DB/productos.json')

routerProductos.get('/', async (req, res) => {
    res.status(200).json(await contenedor.getAll())
});

routerProductos.get('/:id', async (req, res) => {
    const id = req.params.id;
    res.status(200).json(await contenedor.getById(id))
});

routerProductos.post('/', async (req, res) => {
    console.log(await req.body)
    contenedor.save(await req.body)
    res.status(201).json({msg: 'Agregado!', data: req.body})
});

routerProductos.put('/:id', async (req, res) => {
    const id = req.params.id;
    res.status(201).json(await contenedor.updateById(id, "banana", "2", "nd"))
})

routerProductos.delete('/:id', async (req, res) => {
    const id = req.params.id;
    res.status(201).json(await contenedor.deleteById(id))
})

module.exports = routerProductos;
