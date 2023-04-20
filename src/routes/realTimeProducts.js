import { Router } from "express";
import express from 'express';
import { Server, Socket } from "socket.io";
import ProductManager from '../utils/productsManager.js';

const productManager = new ProductManager()

const router = Router();

const io = new Server()

router.get('/', async (req, res) => {
    // Obtener los productos usando el método getProducts de ProductManager
    const products = await productManager.getProducts();
    
    // Renderizar la vista "realTimeProducts.handlebars\" con los productos obtenidos
    res.render('realTimeProducts', {products});
  
    // Enviar los datos en tiempo real a la vista usando socket.io
    io.on('connection', (socket) => {
      socket.emit('products', products);
    });
  });

  router.post('/', async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    
    // Agregar el nuevo producto usando el método addProducts de ProductManager
    const newProduct = await productManager.addProducts({ title, description, price, thumbnail, code, stock });
    
    // Enviar los datos del nuevo producto en tiempo real a la vista usando socket.io
    io.emit('products', newProduct);
    
    // Redireccionar a la página principal de productos
    res.redirect('/');
  });

export default router;