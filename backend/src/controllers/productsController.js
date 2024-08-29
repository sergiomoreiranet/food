const productsRepository = require('../repositories/productsRepository');

// Função para obter um produto por ID
async function getProduct(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10); // Obtém o ID do parâmetro da URL
        const product = await productsRepository.getProductById(id);

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        res.json(product);
    } catch (error) {
        next(error); // Passa o erro para o middleware de tratamento de erros
    }
}

// Função para obter todos os produtos
async function getAllProducts(req, res, next) {
    try {
        const products = await productsRepository.getAllProducts();
        res.json(products);
    } catch (error) {
        next(error);
    }
}

// Função para criar um novo produto
async function createProduct(req, res, next) {
    try {
        const productData = req.body;
        const newProduct = await productsRepository.createProduct(productData);
        res.status(201).json(newProduct); // Retorna o produto criado com status 201
    } catch (error) {
        next(error);
    }
}

// Função para atualizar um produto
async function updateProduct(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10); // Obtém o ID do parâmetro da URL
        const newProductData = req.body;
        const updatedProduct = await productsRepository.updateProduct(id, newProductData);

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        res.json(updatedProduct);
    } catch (error) {
        next(error);
    }
}

// Função para excluir um produto
async function deleteProduct(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10); // Obtém o ID do parâmetro da URL
        await productsRepository.deleteProduct(id);
        res.sendStatus(204); // Retorna status 204 (No Content) após exclusão
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getProduct,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
};
