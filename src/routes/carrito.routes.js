import express from 'express'
import { carritosDao as carrito, productosDao as contenedor } from '../daos/index.js'

const routerCarrito = express.Router();


routerCarrito.post('/', async (req, res) => {
    res.json({id: await carrito.save({ productos: []})})
});

routerCarrito.delete('/:id', async (req, res) => {
    res.json(await carrito.deleteById(req.params.id))
});

routerCarrito.get('/:id/productos', async (req, res) => {
    const cart = await carrito.getById(req.params.id)
    res.status(200).json(cart.productos)
});

routerCarrito.post('/:id/productos', async (req, res) => {
    const cart = await carrito.getById(req.params.id) ;
    const producto = await contenedor.getById(req.body.id)
    cart.productos.push(producto)
    await carrito.updateById(req.params.id, cart)
    res.end()
});

routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    const cart = await carrito.getById(req.params.id)
    const index = cart.productos.findIndex(p => p.id == req.params.id_prod )
    if(index != -1) {
        cart.productos.splice(index, 1)
        await carrito.updateById(req.params.id, cart)
    }
    res.end()
})

export default routerCarrito;