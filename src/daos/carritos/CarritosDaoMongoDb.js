import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";



export default class CarritosDaoMongoDb extends ContenedorMongoDb{
    constructor() {
        super('carrito', {
            productos: { type: [], required: true }
        })

    }

    async save(carrito = { productos: []}) {
        return await super.save(carrito)
    }

}
