const express = require('express');
const authMiddleware = require('./middlewares/authMiddleware');
const authController = require('./controllers/authController');
const settingsController = require('./controllers/settingsController');
const productsController = require('./controllers/productsController');

require('express-async-errors');

const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Rotas de autenticação
app.post('/login', authController.doLogin);
app.post('/logout', authController.doLogout);

// Rotas de configurações
app.get('/settings', authMiddleware, settingsController.getSettings);
app.patch('/settings', authMiddleware, settingsController.updateSettings);

// Rotas de produtos
app.get('/products', authMiddleware, productsController.getAllProducts);
app.get('/products/:id', authMiddleware, productsController.getProduct);
app.post('/products', authMiddleware, productsController.createProduct);
app.patch('/products/:id', authMiddleware, productsController.updateProduct);
app.delete('/products/:id', authMiddleware, productsController.deleteProduct);

// Adicione suas outras rotas conforme necessário

app.use(require('./middlewares/errorMiddleware'));

module.exports = app;
