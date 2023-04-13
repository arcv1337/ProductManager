import express, {Router} from 'express';
import carritoRouter from './src/routes/carrito.js';
import productosRouter from './src/routes/productos.js';

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/products', productosRouter)
app.use('/api/carts', carritoRouter)


app.listen(PORT, ()=>{
    console.log('Server is running on port ' + PORT);
})




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