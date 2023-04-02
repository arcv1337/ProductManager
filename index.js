import express from 'express';
import ProductManager from './manager/ProductManager.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const productManager = new ProductManager();
const PRODUCTS_FILE = './files/Productos.json';




app.get('/products', (req, res) => {
  const publicDirPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')
  app.use(express.static(publicDirPath));   
  res.sendFile(path.join(publicDirPath, 'index.html'));
});


app.get('/', (req, res) => {
  res.send(`
    <div style="text-align:center;">
      <h1>Bienvenido a nuestra tienda en línea</h1>
      <p>En nuestra tienda encontrarás una gran variedad de productos de alta calidad a precios competitivos.</p>
      <button onclick="location.href='/products'">Ver productos</button>
    </div>
  `);
});


app.get('/api/products', async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});


app.get('/api/products/:pid', async (req, res) => {
  const pid = req.params.pid;
  const products = await productManager.getProducts();
  const product = products.find(p => p.id === parseInt(pid));
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});


app.get('/products/:pid', async (req, res) => {
  let pid = req.params.pid;
  let data = await fs.readFile(PRODUCTS_FILE);
  let products = JSON.parse(data);
  let product = products.find(p => p.id === parseInt(pid));
  if (product) {
    res.send(`
      <h1>${product.titulo}</h1>
      <p>${product.descripcion}</p>
      <p>Precio: ${product.precio}</p>
      <img src="${product.thumbnail}">
    `);
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
}


/* let prod1 = await productManager.getProductById(1);

let prod1Update = await productManager.updateProducts(prod1, 'Pepino', 'Descripcion', 300);

console.log(prod1Update);

 */