const Product = require('../models/productModel');

// Função para obter um produto por ID
function getProductById(id) {
    return Product.findByPk(id);
}

// Função para obter todos os produtos
function getAllProducts() {
    return Product.findAll();
}

// Função para atualizar um produto
async function updateProduct(id, newProductData) {
    const product = await getProductById(id);

    if (!product) {
        throw new Error('Produto não encontrado');
    }

    // Atualiza os campos do produto com os novos dados, se fornecidos
    if (newProductData.nome && newProductData.nome !== product.nome)
        product.nome = newProductData.nome;

    if (newProductData.descricao && newProductData.descricao !== product.descricao)
        product.descricao = newProductData.descricao;

    if (newProductData.preco !== undefined && newProductData.preco !== product.preco)
        product.preco = newProductData.preco;

    if (newProductData.categoria && newProductData.categoria !== product.categoria)
        product.categoria = newProductData.categoria;

    if (newProductData.quantidade !== undefined && newProductData.quantidade !== product.quantidade)
        product.quantidade = newProductData.quantidade;

    await product.save(); // Correção: Salvar as alterações no banco de dados

    return product; // Certifique-se de retornar o produto atualizado
}

// Função para criar um novo produto
async function createProduct(productData) {
    return Product.create(productData);
}

// Função para excluir um produto por ID
async function deleteProduct(id) {
    const product = await getProductById(id);

    if (!product) {
        throw new Error('Produto não encontrado');
    }

    await product.destroy();
    return { message: 'Produto excluído com sucesso' };
}

module.exports = {
    getProductById,
    getAllProducts,
    updateProduct,
    createProduct,
    deleteProduct
};