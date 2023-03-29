import ProductManager from './manager/ProductManager.js';


const productManager = new ProductManager();

const env = async () => {

    let productos = await productManager.getProducts();
    console.log(productos) //[]

    let producto = {
        titulo: 'Arroz',
        descripcion: 'dsfjdsf',
        precio: 500,
        thumbnail: 'dsfds',
        code: 3150,
        stock: 263,
    };
    await productManager.addProducts(producto)
    productos = await productManager.getProducts();

    console.log(productos);


}

env()