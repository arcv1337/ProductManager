import ProductManager from "./src/Dao/managers/productsManager.js";
import http from "http";
import { Server } from "socket.io";

const productos = new ProductManager("./files/Productos.js");

const prods = await productos.getProducts();

export default function configureWebSocketServer(app) {
  const server = http.createServer(app);
  const socketServerIO = new Server(server);
  socketServerIO.on("connection", (socket) => {
    console.log("Usuario conectado");

    socket.on("nuevoProducto", async (producto) => {
      await productos.addProducts(producto);
      const newProducts = await productos.getProducts();
      console.log(newProducts);
      socketServerIO.emit("actualizarTabla", newProducts)
    });
    socket.on("quitarProducto", async ({ id }) => {
      await productos.deleteProducts(id);
      console.log(id);

      socketServerIO.emit("actualizarTabla", await productos.getProducts());
    });
  });

  return { server, socketServerIO };
}