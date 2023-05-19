import { Router } from 'express';
import ProductManagerMongo from '../utils/productsManagerMongo.js';

const productManagerMongo = new ProductManagerMongo();
const router = Router();

router.get('/', async (req, res) => {
  const limit = req.query.limit;

  try {
    const products = await productManagerMongo.getProducts();

    if (limit) {
      products = products.slice(0, limit);
    }

    const count = products.length;
    res.json({ count, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/:pid', async (req, res) => {
  const id = req.params.pid;

  try {
    const response = await productManagerMongo.getProductById(id);
    res.status(response.code).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.post('/', async (req, res) => {
  const { title, description, code, price, stock, thumbnail } = req.body;

  if (!title || !description || !code || !price || !stock || !thumbnail) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    const response = await productManagerMongo.addProduct({
      title,
      description,
      code,
      price,
      stock,
      thumbnail,
    });

    res.status(response.code).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.put('/:pid', async (req, res) => {
  const id = req.params.pid;
  const { title, description, price, thumbnail, status, code, stock } = req.body;
  const updatedFields = {
    title,
    description,
    price,
    thumbnail,
    status,
    code,
    stock,
  };

  try {
    const response = await productManagerMongo.updateProduct(id, updatedFields);
    res.status(response.code).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.delete('/:pid', async (req, res) => {
  const id = req.params.pid;

  try {
    const response = await productManagerMongo.deleteProduct(id);
    res.status(response.code).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;