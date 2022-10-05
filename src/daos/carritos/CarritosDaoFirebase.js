import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js"

export default class CarritosDaoFirebase extends ContenedorFirebase {
    constructor(){
    super('carritos')}

    async save(carrito = { productos: []}) {
        return await super.save(carrito)
    }

}

