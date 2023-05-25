import { Router } from 'express';
import path from 'path'
import exphbs from 'express-handlebars';
import __dirname from '../utils.js';
import ProductManagerMongo from '../Dao/managers/productsManagerMongo.js';

const productManagerMongo = new ProductManagerMongo();
const router = Router();

// Configuración del motor de vistas Handlebars
const viewsDir = path.join(__dirname, '..', 'views');
const layoutsDir = path.join(viewsDir, 'layouts');
const partialsDir = path.join(viewsDir, 'partials');

const handlebars = exphbs.create({
  defaultLayout: 'main',
  layoutsDir,
  partialsDir,
});

router.get('/products', async (req, res) => {
  try {
    const queryParams = {
      limit: req.query.limit,
      page: req.query.page,
      sort: req.query.sort,
      query: req.query.query,
    };

    const response = await productManagerMongo.getProducts(queryParams);

    res.render('products', {
      products: response.payload,
      hasPrevPage: response.hasPrevPage,
      hasNextPage: response.hasNextPage,
      prevLink: response.prevLink,
      nextLink: response.nextLink,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
});

export default router;