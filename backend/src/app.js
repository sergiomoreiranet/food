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

// Adicione um log para verificar se o middleware de autenticação está sendo chamado
app.use((req, res, next) => {
  console.log('Rota acessada:', req.path);
  console.log('Token recebido:', req.headers.authorization);
  next();
});

// Função para extrair o token do cabeçalho de autorização
const extractToken = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
};

// Rota de atualização de produto modificada
app.patch('/products/:id', authMiddleware, (req, res, next) => {
  console.log('Tentando atualizar o produto:', req.params.id);
  console.log('Corpo da requisição:', req.body);
  
  const token = extractToken(req);
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }
  
  // Adicione aqui a lógica para verificar e decodificar o token
  // Se o token for válido, continue com a atualização do produto
  // Caso contrário, retorne um erro de autenticação
  
  productsController.updateProduct(req, res, next);
});

// Rota de exclusão de produto ajustada
app.delete('/products/:id', authMiddleware, (req, res, next) => {
  console.log('Tentando excluir o produto:', req.params.id);
  
  const token = extractToken(req);
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }
  
  // Adicione aqui a lógica para verificar e decodificar o token
  // Se o token for válido, continue com a exclusão do produto
  // Caso contrário, retorne um erro de autenticação
  
  productsController.deleteProduct(req, res, next);
});

// Adicione um log no authMiddleware
app.use(authMiddleware, (req, res, next) => {
  console.log('Middleware de autenticação passou');
  next();
});

// Adicione suas outras rotas conforme necessário

app.use(require('./middlewares/errorMiddleware'));

module.exports = app;
