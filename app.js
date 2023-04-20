import express from "express";
import __dirname from "./src/utils.js";
import handlebars from "express-handlebars";
import viewRouter from "./src/routes/views.router.js";
import carritoRouter from './src/routes/carrito.js';
import productosRouter from './src/routes/productos.js';
import realtimeRouter from './src/routes/realTimeProducts.js'
import { Server } from "socket.io";
import http from 'http';

const PORT = process.env.PORT || 6060;
const app = express();
const httpServer = http.createServer(app);

//Vistas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

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

//Chat socket.io

const io = new Server(httpServer);
const messages = [];

io.on('connection', Socket =>{

    console.log('Socket connected');

    Socket.on('message', data=>{
        messages.push(data);
        io.emit('messageLogs', messages)
    })
    Socket.on('authenticated', data =>{
        Socket.broadcast.emit('newUserConnected', data)
    })
});

httpServer.listen(PORT, ()=>{
    console.log('Servidor funcionando en el puerto: ' + PORT);
});



