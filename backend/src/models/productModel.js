const Sequelize = require('sequelize');
const database = require('../db'); // Substitua por sua conexão com o banco

const Product = database.define('Produto', { // Nome do modelo: 'Produto'
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descricao: {
    type: Sequelize.TEXT, // Para descrições longas
    allowNull: true
  },
  preco: {
    type: Sequelize.DECIMAL(10, 2), // Preço com duas casas decimais
    allowNull: false
  },
  categoria: {
    type: Sequelize.STRING, // Tipo de dados para a categoria
    allowNull: true
  },
  quantidade: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true // Adiciona campos createdAt e updatedAt automaticamente
});

module.exports = Product;
