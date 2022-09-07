const fs = require('fs/promises');

//db
let moment = require('moment'); 

class Carrito {
    constructor(ruta) {
        this.ruta = ruta;
    }

    async getAll() {
        try {
            const objs = await fs.readFile(this.ruta, 'utf8');
            
            return JSON.parse(objs); 
        
        } catch (error) {
            return [];
        }
    } 
    

    async newCarrito(obj) {
        try {
            const objs = await this.getAll();
            let newId;
            if (objs.length == 0) {
                newId = 1
            } else {
                newId = objs[objs.length - 1].id + 1;
            }

            const newObj = { ...obj, id: newId, timestamp: moment().format('MMMM Do YYYY, h:mm:ss a')};
            objs.push(newObj);
        
            
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
            return newObj;
        }
        catch (error) {
            console.log(error);
        }
    }
    async getCarritoById(id) {
        
        try {
            const objs = await this.getAll();
            const objId = objs.find(obj => obj.id == id);
            if (objId == undefined) {
                return {error: 'Carrito no encontrado'};
            } else { 
                return objId;
            }
           
        } catch (error) {
            return 'Error';
        }

        
    }
    async deleteById(id) {
        try {
            const objs = await this.getAll();
            const indexObj = objs.findIndex(obj => obj.id == id);
            if(indexObj == -1) {
                return 'elemento no encontrado';
            } else {
                objs.splice(indexObj, 1);
                await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
                return 'elemento eliminado';
            }
        } catch (error){
            return 'No se pudo eliminar';
        }        
        
    }
    
    async getProdAgregadosById(id) {
        
        try {
            const objs = await this.getAll();
            const objId = objs.find(obj => obj.id == id);
            if (objId == undefined) {
                return {error: 'Carrito no encontrado'};
            } else { 
                return objId.productos;
            }
           
        } catch (error) {
            return 'Error';
        }

        
    }

    async saveProductoById(prod, id) {
        try{
            const objs = await this.getAll();
            const objId = objs.find(obj => obj.id == id);
            const newProd = { ...prod, timestamp: moment().format('MMMM Do YYYY, h:mm:ss a') };
            objId.productos.push(newProd)

            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
            return 'producto agregado al carrito';
            

        } catch (error) {
        return console.log(error)
    }
    
}
async deleteById(id_prod, id) {
        try {
            const objs = await this.getAll();
            const carrito = objs.find(obj => obj.id == id);
            
            const indexObj = carrito.productos.findIndex(obj => obj.id == id_prod);
            console.log(indexObj)
            if(indexObj == -1) {
                return 'producto no encontrado en el carrito';
            } else {
                
                carrito.productos.splice(indexObj, 1);
                await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
                return 'elemento eliminado';
            }
        } catch (error){
            return console.log(error);
        }        
        
    }
}


module.exports = Carrito;