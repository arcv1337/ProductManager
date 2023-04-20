import { Router } from "express";
import express from 'express';
import { Server, Socket } from "socket.io";
import ProductManager from '../utils/productsManager.js';

const productManager = new ProductManager()

const router = Router();

const io = new Server()

router.get('/', async (req, res) => {
   
    const products = await productManager.getProducts();
    
   
    res.render('realTimeProducts', {products});
  
    
    io.on('connection', (socket) => {
      socket.emit('products', products);
    });
  });

  router.post('/', async (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    

    const newProduct = await productManager.addProducts({ title, description, price, thumbnail, code, stock });
    
   
    io.emit('products', newProduct);
    
    res.redirect('/');
  });

export default router;