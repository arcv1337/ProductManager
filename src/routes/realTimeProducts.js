import { Router } from "express";
import express from 'express';
import { Server, Socket } from "socket.io";
import ProductManager from '../utils/productsManager.js';

const productManager = new ProductManager()

const router = Router();

const io = new Server();

router.get('/', async (req, res) => {
   
    const products = await productManager.getProducts();
    
   
    res.render('realTimeProducts', {products});
    
    
    io.on('connection', (socket) => {
      socket.emit('products', products);
    });
  });


  
  router.post('/', async (req, res) => {
    const socket = io();
    const addProd = document.getElementById('add-product-form');
    addProd.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const price = document.getElementById('price').value;
      const thumbnail = document.getElementById('thumbnail').value;
      const code = document.getElementById('code').value;
      const stock = document.getElementById('stock').value;
      const newProduct = { title, description, price, thumbnail, code, stock };
      socket.emit('add-product', newProduct);
      addProd.reset();
    });

    socket.on('products', (products) => {
      console.log(products);
      const productList = document.getElementById('product-list');
      productList.innerHTML = '';
      products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.title} - $${product.price}`;
        productList.appendChild(listItem);
      });
    });
  });

export default router;