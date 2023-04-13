import { Router } from 'express';
import express from 'express';
import ProductManager from '../utils/productsManager.js';


const productManager = new ProductManager()


const router = Router();


router.get('/', (req, res) => {
  productManager.getProducts()
    .then(products => {
      res.json(products);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

router.post('/', async (req, res) => {
  const { title, description, code, price, stock, thumbnail } = req.body;
  try {
    const addedProduct = await productManager.addProducts({
      title,
      description,
      code,
      price,
      stock,
      thumbnail,
    });
    res.status(201).json(addedProduct[addedProduct.length-1]); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/:pid', async (req, res) => {
  const id = req.params.pid;
  const products = await productManager.getProducts();
  const product = products.find(p => p.id === parseInt(id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});







export default router;