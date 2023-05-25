import { Router } from "express";
import ProductManager from '../Dao/managers/productsManager.js';
import configureWebSocketServer from "../../socket.js";
const productos = new ProductManager(".../files/Productos.json");

const realTime = Router();

//vista realtime
realTime.get("/", async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const prods = await productos.getProducts(limit);
  res.render("realTimeProducts", { productos: prods });
  const { socketServerIO } = configureWebSocketServer();

  socketServerIO.on("connection", (socket) => {

    console.log("Usuario conectado");

  });
  
});

export default realTime;