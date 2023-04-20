import express from "express";
import __dirname from "./src/utils.js";
import handlebars from "express-handlebars";
import viewRouter from "./src/routes/views.router.js";
import carritoRouter from './src/routes/carrito.js';
import productosRouter from './src/routes/productos.js';
import realtimeRouter from './src/routes/realTimeProducts.js';
import configureWebSocketServer from "./socket.js";

//Express
const app = express();
const PORT = 8080;

const { server } = configureWebSocketServer(app);

//handleBars
app.engine(
    "hbs",
    handlebars.engine({
      extname: ".hbs",
      defaultLayout: "main.hbs",
      layoutsDir: "./src/views/layouts",
      partialsDir: "views",
    })
  );
  app.set("views", __dirname + "/views");
  app.set("view engine", "hbs");
  

//Servicio
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'))

//Rutas
//Vistas
app.use('/', viewRouter);
app.use('/api/products', productosRouter);
app.use('/api/carts', carritoRouter);
app.use('/realtimeproducts', realtimeRouter);


server.listen(PORT, () => {
    console.log(`Servidor escuchando en: ${PORT}`);
  });