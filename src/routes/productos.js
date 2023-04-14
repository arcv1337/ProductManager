import { Router } from 'express';
import express from 'express';
import ProductManager from '../utils/productsManager.js';


const productManager = new ProductManager()
const router = Router();

router.get('/', (req, res) => {
  const limit = req.query.limit;

  productManager.getProducts()
    .then(products => {
      if (limit) {
        products = products.slice(0, limit);
      }
      const count = products.length;
      res.json({ count: count, products: products });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    });
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


router.post('/', async (req, res) => {
  const { title, description, code, price, stock, thumbnail } = req.body;
  if (!title || !description || !code || !price || !stock || !thumbnail) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
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


router.put('/:pid', async (req, res) => {
  const id = parseInt(req.params.pid);
  const { title, description, price, thumbnail, status, code, stock  } = req.body;
  const updatedFields = { title, description, price, thumbnail, status, code, stock };
  
  try {
    const updatedProduct = await productManager.updateProducts(id, updatedFields);
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Product not found' });
  }
});


router.delete('/:pid', async (req, res) => {
  const id = parseInt(req.params.pid);
  try {
    const deletedProduct = await productManager.deleteProducts(id);
    if (deletedProduct) {
      res.json({ success: true, message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;