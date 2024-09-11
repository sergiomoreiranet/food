const productsRepository = require('../repositories/productsRepository');

// Função para obter um produto por ID
async function getProduct(req, res, next) {
    try {
        const id = req.params.id;
        const product = await productRepository.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar produto' });
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
    const { id } = req.params;
    const productData = req.body;

    try {
        console.log("Dados recebidos para atualização:", id, productData); // Adiciona log
        
        // Validação dos dados recebidos
        if (isNaN(id) || !productData) {
            return res.status(400).json({ message: 'Dados inválidos' });
        }

        // Lógica para atualizar o produto no banco de dados
        const updatedProduct = await productsRepository.updateProduct(id, productData);
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        res.status(200).json({ message: 'Produto atualizado com sucesso!', product: updatedProduct });
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
