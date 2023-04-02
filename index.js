import express from 'express';
import ProductManager from './manager/ProductManager.js';
import fs from 'fs/promises';
import path from 'path';
import tableGenerator from './tableGenerator.js';
import { fileURLToPath } from 'url';

const { generateTable } = tableGenerator;
const app = express();
const productManager = new ProductManager();
const PRODUCTS_FILE = './files/Productos.json';

// Define la ruta raíz del servidor para servir el archivo index.html
const publicDirPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')
app.use(express.static(publicDirPath));

// La ruta '/products' ahora devuelve el archivo index.html
app.get('/products', (req, res) => {
  res.sendFile(path.join(publicDirPath, 'index.html'));
});

app.get('/api/products', async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
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