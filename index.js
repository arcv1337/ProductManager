
import express from 'express';
import ProductManager from './manager/ProductManager.js';
import fs from 'fs/promises';

const app = express();
const productManager = new ProductManager();
const PRODUCTS_FILE = './files/Productos.json';

app.get('/products', async (req, res) => {
  let limit = req.query.limit || Number.MAX_SAFE_INTEGER;
  let data = await fs.readFile(PRODUCTS_FILE);
  let products = JSON.parse(data);
  if (limit === 'all') {
    res.json(products);
  } else {
    res.json(products.slice(0, limit));
  }
});

app.get('/products/:pid', async (req, res) => {
  let pid = req.params.pid;
  let data = await fs.readFile(PRODUCTS_FILE);
  let products = JSON.parse(data);
  let product = products.find(p => p.id === parseInt(pid));
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});


const env = async () => {

    let productos = await productManager.getProducts();
    /* console.log(productos) */ //[]

     let producto = {
        titulo: 'Arroz',
        descripcion: 'dsfjdsf',
        precio: 500,
        thumbnail: 'dsfds',
        code: 3150,
        stock: 0,
    };
    await productManager.addProducts(producto)
    productos = await productManager.getProducts();

 /*    console.log(productos);
 */

}






/* let prod1 = await productManager.getProductById(1);

let prod1Update = await productManager.updateProducts(prod1, 'Pepino', 'Descripcion', 300);

console.log(prod1Update);

 */