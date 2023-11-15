import fs from 'fs' // se llama al modulo de FileSystem
//Se crea la clase ProductManager la cual manejará productos con las funcionalidades de agregar,  consultar, modificar y eliminar productos

export default class ProductManager {
    // se agrega la variable this.patch con la ruta, de manera de que al instanciar reciba la ruta a trabajar
    constructor (patch){        
        this.patch=patch;
        this.products=[]
    }
//las funcionalidades se agregan en forma de metodos:
    // metodo agregar producto
    addProduct = async (title,description ,price,thumbnail,code,stock) =>{

        this.products = await this.getProducts();          

        const product ={ 
            title,
            description,
            price, 
            thumbnail,
            code,
            stock
        }
        //se genera el parametro id, el cual debe ser unico para cada producto
        if(this.products.length===0){
            product.id = 1;
        }else{
            product.id = this.products[this.products.length-1].id+1;
        }

// antes de agregar un producto se valida que el ingreso contenga todos los parametros (title,description ,price,thumbnail,code,stock)
        if (title && description && price && thumbnail && code && stock ){
            const buscar = this.products.find(producto => producto.code===code);
// Se valida que el parámetro "codigo" no se repita en otro producto
            if (buscar===undefined){
                this.products.push(product)
                await fs.promises.writeFile(this.patch,JSON.stringify(this.products,null,'\t'))
            } 
            else{
                return console.log(`el code  ${code}  ya existe`)
            }                       
        }
        else{
            return console.log("intenta ingresar un producto con los parametros incompletos")
        }
       
    }

    getProducts = async () =>{
        
         if (fs.existsSync(this.patch)){
            const content = await fs.promises.readFile(this.patch,'utf-8','\t');
            this.products = JSON.parse(content)
            return this.products;
         }
         return [] 
    }
    //metodo para buscar un producto partiendo del id
    getProductById = async (id)=>{

        this.products = await this.getProducts();  
        const productoPorId = this.products.find(element => element.id===id);
        if (productoPorId===undefined){
            return console.log(`Not found: el id ${id} no existe`)
        }
        else
            {
                return console.log(productoPorId)
            }        
    }
//metodo para actualizar (cambiar) valor del parámeto del producto: dado el id, se indica el parámetro a modificar y el nuevo valor
    updateProduct = async (id,atributo,valor) =>{
        this.products = await this.getProducts();        
        const indice = this.products.findIndex(producto=>producto.id===id)
        if (indice===-1){
            return console.log(`el producto con id: ${id} a modificar, no existe`)        
        }        

        const produtoAux = this.products[indice]
        produtoAux[atributo] = valor; 
        this.products[indice] = produtoAux;

        await fs.promises.writeFile(this.patch,JSON.stringify(this.products,null,'\t'))        
    }
// metodo para eliminar productos
    deleteProduct = async (id) =>{
        this.products = await this.getProducts();  
        if(this.products.some(producto=> producto.id===id)){
            this.products = this.products.filter(producto => producto.id !==id) 
            if (this.products.length===0){
                if (fs.existsSync(this.patch)){
                    await fs.promises.unlink(this.patch) 
                }            
            }
            else{
                await fs.promises.writeFile(this.patch,JSON.stringify(this.products,null,'\t'))    
            } 
        }
        else{
            console.log(`el producto con id ${id} a eliminar, no existe`)
        }          
    }
}

// Validación del código 


/*export const producto = new ProductManager("./productsFile.txt");*/
/*
await producto.addProduct("title1","description" ,"price1","imagen1",1221,"stock1")
await producto.addProduct("title2","description" ,"price2","imagen2",8599,"stock2")
await producto.addProduct("title3","description" ,"price3","imagen3",7215,"stock3")
await producto.addProduct("title4","description" ,"price4","imagen4",2112,"stock4")
await producto.addProduct("title5","description" ,"price5","imagen5",8954,"stock5")
await producto.addProduct("title6","description" ,"price6","imagen6",3642,"stock6")
await producto.addProduct("title7","description" ,"price7","imagen7",8457,"stock7")
await producto.addProduct("title8","description" ,"price8","imagen8",5541,"stock8")
await producto.addProduct("title9","description" ,"price9","imagen9",8996,"stock9")
await producto.addProduct("title10","description" ,"price10","imagen10",4421,"stock10")
await producto.addProduct("title11","description" ,"price11","imagen11",1117,"stock11")
await producto.addProduct("title12","description" ,"price12","imagen12",3322,"stock12")
await producto.addProduct("title13","description" ,"price13","imagen13",8899,"stock13")
await producto.addProduct("title14","description" ,"price14","imagen14",2795,"stock14")
await producto.addProduct("title15","description" ,"price15","imagen15",1183,"stock15")
await producto.addProduct("title16","description" ,"price16","imagen16",4613,"stock16")


//await producto.addProduct("title5","descriptionE" ,"price5",4249,"stock5") 
//await producto.getProductById(2);
//await producto.getProductById(10);
//await producto.deleteProduct(12);
//await producto.updateProduct(3,"price","newprice3")

console.log(await producto.getProducts());*/