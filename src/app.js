//importaciones requeidas 
import  express  from "express";
import ProductManager from "./Components/ProductManager.js";

// ejecutando exprress
const app = express()
// se retoman los productos de la class ProductManager
const producto = new ProductManager("./productsFile.txt");
const productos = producto.getProducts();
 
//ruta para traer todos los productos que puede aceptar un limite si es solicitado
app.get("/products", async(request, response) =>{
    //**PUEBA */
   let limit= parseInt(request.query.limit);
   if(!limit) return response.send( await productos);
    let prod = await productos;
    if(prod.length>= limit){
    let productLimit = prod.slice(0,limit);
    response.send(productLimit)
    }else {
        response.send(`${limit} supera la cantidad de poductos disponibles`)
    }
});
//ruta especificando el id del producto para recuperarlo
app.get("/products/:id", async(request, response)=>{
    let id = parseInt(request.params.id);
    let prod = await productos;
    let productById = prod.find(product => product.id === id)
    if(!productById) return response.send(`El poducto ${id} no existe`)
    response.send(productById)
})

// iniciando el servidor
const PORT = 8080
const server= app.listen(PORT,()=>console.log( `Server up at port ${server.address().port}`))