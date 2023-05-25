import { Router } from 'express';
import CartModel from '../Dao/models/cartModel.js';
import ProductModel from '../Dao/models/productModel.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const cart = await CartModel.create({});
    res.status(202).send({
      status: 'Success',
      message: cart
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 'Error',
      message: 'Error al agregar el carrito'
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const carts = await CartModel.find({});
    res.status(202).send({
      status: 'OK',
      message: carts
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 'Error',
      message: 'Error al obtener los carritos'
    });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const cart = await CartModel.findOne({ _id: req.params.cid })
      .populate('products', '-__v')
      .exec();

    if (!cart) {
      return res.status(404).send({
        status: 'Error',
        message: 'No se ha encontrado un carrito con ese ID'
      });
    }

    res.status(202).send({
      status: 'OK',
      message: cart.products
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 'Error',
      message: 'Error al obtener el carrito'
    });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cart = await CartModel.findOne({ _id: req.params.cid });
    const product = await ProductModel.findOne({ _id: req.params.pid });

    if (!cart || !product) {
      return res.status(404).send({
        status: 'Error',
        message: 'No se ha encontrado un carrito o producto con ese ID'
      });
    }

    cart.products.push(product);
    await cart.save();

    res.status(202).send({
      status: 'OK',
      message: cart.products
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 'Error',
      message: 'Error al actualizar el carrito'
    });
  }
});

router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const cart = await CartModel.findOne({ _id: req.params.cid });

    if (!cart) {
      return res.status(404).send({
        status: 'Error',
        message: 'No se ha encontrado un carrito con ese ID'
      });
    }

    const productIndex = cart.products.findIndex(p => p.toString() === req.params.pid);

    if (productIndex === -1) {
      return res.status(404).send({
        status: 'Error',
        message: 'No se ha encontrado un producto con ese ID en el carrito'
      });
    }

    cart.products.splice(productIndex, 1);
    await cart.save();

    res.status(202).send({
      status: 'OK',
      message: 'Producto eliminado del carrito exitosamente'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 'Error',
      message: 'Error al eliminar el producto del carrito'
    });
  }
});

router.delete('/:cid', async (req, res) => {
  try {
    const cart = await CartModel.findOne({ _id: req.params.cid });

    if (!cart) {
      return res.status(404).send({
        status: 'Error',
        message: 'No se ha encontrado un carrito con ese ID'
      });
    }

    cart.products = [];
    await cart.save();

    res.status(202).send({
      status: 'OK',
      message: 'Productos eliminados del carrito exitosamente'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 'Error',
      message: 'Error al eliminar los productos del carrito'
    });
  }
});

router.put('/:cid', async (req, res) => {
  try {
    const cart = await CartModel.findOne({ _id: req.params.cid });

    if (!cart) {
      return res.status(404).send({
        status: 'Error',
        message: 'No se ha encontrado un carrito con ese ID'
      });
    }

    const { products } = req.body;

    cart.products = products;
    await cart.save();

    res.status(200).send({
      status: 'OK',
      message: 'Carrito actualizado exitosamente'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 'Error',
      message: 'Error al actualizar el carrito'
    });
  }
});

router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const cart = await CartModel.findOne({ _id: req.params.cid });

    if (!cart) {
      return res.status(404).send({
        status: 'Error',
        message: 'No se ha encontrado un carrito con ese ID'
      });
    }

    const { quantity } = req.body;

    const productIndex = cart.products.findIndex(p => p.toString() === req.params.pid);

    if (productIndex === -1) {
      return res.status(404).send({
        status: 'Error',
        message: 'No se ha encontrado un producto con ese ID en el carrito'
      });
    }

    cart.products[productIndex].quantity = quantity;
    await cart.save();

    res.status(200).send({
      status: 'OK',
      message: 'Cantidad de ejemplares actualizada exitosamente'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 'Error',
      message: 'Error al actualizar la cantidad de ejemplares'
    });
  }
});

export default router;