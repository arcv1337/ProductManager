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

router.get('/', async (req, res) => {
  const respuesta = await CartManagerMongo.getShoppingCarts();
  res.status(respuesta.code).send({
    status: respuesta.status,
    message: respuesta.message
  })
});


router.get('/:cid', async (req, res) => {
    const respuesta = await CartManagerMongo.getShoppingCartById(req.params.cid);
    res.status(respuesta.code).send({
      status: respuesta.status,
      message: respuesta.message
    })
});


router.post('/:cid/product/:pid', async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  
  const respuesta = await CartManagerMongo.updateShoppingCart(cid,pid);

  res.status(respuesta.code).send({
    status: respuesta.status,
    message: respuesta.message
  });

});


export default router;







