import {Router} from 'express';
import express from 'express';
import cartManager from '../utils/carritosManager.js';
import cartManagerMongo from '../utils/carritosManagerMongo.js';


const router = Router();
const CartManager = new cartManager()
const CartManagerMongo = new cartManagerMongo();

router.post('/', async (req, res) => {
  const respuesta = await CartManagerMongo.addShoppingCart();
  res.status(respuesta.code).send({
    status: respuesta.status,
    message: respuesta.message
  })
});

router.get('/:cid', async (req, res) => {
  try {
    const shoppingCart = await CartManager.getShoppingCartById(req.params.cid);
    if (shoppingCart) {
      res.json(shoppingCart.products);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  
  try {
    const shoppingCart = await CartManager.getShoppingCartById(req.params.cid);
    if (!shoppingCart) {
      return res.status(404).send('Shopping cart not found');
    }
    const productId = req.params.pid;
    const product = { id: productId, quantity: 1 };
    const existingProductIndex = shoppingCart.products.findIndex(p => p.id === productId);
    if (existingProductIndex !== -1) {
      shoppingCart.products[existingProductIndex].quantity++;
    } else {
      shoppingCart.products.push(product);
    }
    await CartManager.updateShoppingCart(shoppingCart.id, { products: shoppingCart.products });
    res.status(201).json(product);
  } 
  catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


export default router;







