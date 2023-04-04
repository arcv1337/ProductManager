import express from 'express';
import ProductManager from './manager/ProductManager.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
const port = 8000;
const app = express();
const productManager = new ProductManager();
const PRODUCTS_FILE = './files/Productos.json';

app.use(express.urlencoded({extended:true}))


app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});



/* app.get('/products', (req, res) => {
  const publicDirPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')
  app.use(express.static(publicDirPath));   
  res.sendFile(path.join(publicDirPath, 'index.html'));
});
 */

app.get('/products/', async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined; 
  const products = await productManager.getProducts();
  
  if (limit) {
    const limitedProducts = products.slice(0, limit);
    res.json(limitedProducts);
  } else {
    res.status(400).send('Debe especificar un valor para el parámetro limit');
  }
});

app.get('/products/:id', async (req,res)=>{

  const id = req.params.id;
  const products = await productManager.getProducts();
  const product = products.find(p => p.id === parseInt(id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Producto no encontrado');
  }

})

app.get('/eliminar/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const deletedProduct = await productManager.deleteProducts(id);
  if (deletedProduct) {
    res.send(`El producto con el id ${id} ha sido eliminado`);
  } else {
    res.send(`No existe un producto con el id ${id}`);
  }
});

app.get('/', async (req,res)=>{
  const productos = await productManager.getProducts();
  res.send(productos)
})


app.get('/newquery', async (req, res) => {
  const { titulo, descripcion, precio, thumbnail, code, stock } = req.query;

  if (!titulo || !descripcion || !precio || !thumbnail || !code || !stock) {
    res.send('Faltan datos');
    return;
  }

  const product = {
    titulo,
    descripcion,
    precio,
    thumbnail,
    code,
    stock
  };

  const msg = await productManager.addProducts(product);
  res.send(msg);
});


app.get('/editquery', async (req, res) => {
  try {
    const { id, titulo, descripcion, precio, thumbnail, code, stock } = req.query;
    console.log(id, titulo, descripcion, precio, thumbnail, code, stock);

    if (!titulo || !descripcion || !precio || !thumbnail || !code || !stock || !id) {
      console.log('Datos faltantes');
      res.send('Faltan datos');
      return;
    }
    
    const parsedId = parseInt(id);
    const msg = await productManager.updateProducts(parsedId, titulo, descripcion, precio, thumbnail, code, stock);
    console.log(msg);

    res.send(msg);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ha ocurrido un error');
  }
});


/* app.get('/', (req, res) => {
  res.send(`
    <div style="text-align:center;">
      <h1>Bienvenido a nuestra tienda en línea</h1>
      <p>En nuestra tienda encontrarás una gran variedad de productos de alta calidad a precios competitivos.</p>
      <button onclick="location.href='/products'">Ver productos</button>
    </div>
  `);
});
 */

/* app.get('/api/products', async (req, res) => {
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
}); */




/* app.get('/products/:pid', async (req, res) => {
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
}); */



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
/* 

const updatedProduct = await productManager.updateProducts(9, 'fdsfsd', 'nada', 400, 'nada', 'nada', 0);
console.log(updatedProduct);
 */