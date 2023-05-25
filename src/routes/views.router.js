import { Router } from 'express';
import path from 'path';
import exphbs from 'express-handlebars';
import session from 'express-session';
import bcrypt from 'bcrypt';
import User from '../Dao/models/userModel.js';
import productManagerMongo from "../Dao/managers/productsManagerMongo.js"
import __dirname from '../utils.js';

const router = Router();
const ProductManagerMongo = new productManagerMongo();

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

    const response = await ProductManagerMongo.getProducts(queryParams);

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

// Configuración de la sesión
router.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
}));

// Middleware para verificar la sesión del usuario
const checkAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Ruta de inicio de sesión
router.get('/', async (req, res) => {
  res.render('login');
});

router.get('/register', async (req, res) => {
  res.render('register');
});


// Ruta de registro de usuario
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, age, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.render('register', { error: 'El usuario ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      age,
      password: hashedPassword,
    });

    await newUser.save();
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error interno del servidor' });
  }
});

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.render('login', { error: 'Credenciales inválidas' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.render('login', { error: 'Credenciales inválidas' });
    }

    req.session.user = user;
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error interno del servidor' });
  }
});

// Ruta de perfil del usuario
router.get('/profile', checkAuth, (req, res) => {
  const { firstName, lastName, email, age } = req.session.user;

  res.render('profile', { firstName, lastName, email, age });
});

// Ruta de cierre de sesión
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

export default router;