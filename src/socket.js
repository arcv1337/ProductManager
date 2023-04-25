import ProductManager from "../src/utils/productsManager.js";
import http from "http";
import { Server } from "socket.io";

const productos = new ProductManager("./files/Productos.js");

const prods = await productos.getProducts();

export default function configureWebSocketServer() {
  const server = http.createServer();
  const socketServerIO = new Server(server);
  socketServerIO.on("connection", (socket) => {
    console.log("Usuario conectado");

    socket.on("nuevoProducto", async (producto) => {
      await productos.addProduct(producto);

      socketServerIO.emit("actualizarTabla", await productos.getProducts());
    });
    socket.on("quitarProducto", async ({ id }) => {
      await productos.deleteById(id);
      console.log(id);

      socketServerIO.emit("actualizarTabla", await productos.getProducts());
    });
  });

  return { server, socketServerIO };
}