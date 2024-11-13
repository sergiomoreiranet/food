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
    const updateData = req.body;

    try {
        console.log(`Recebendo requisição para atualizar produto ${id}:`, updateData);
        console.log('Headers da requisição:', req.headers);

        // Verificação de campos obrigatórios
        const requiredFields = ['nome', 'preco', 'descricao', 'categoria', 'quantidade'];
        const missingFields = requiredFields.filter(field => !updateData[field]);
        if (missingFields.length > 0) {
            console.log(`Campos obrigatórios ausentes: ${missingFields.join(', ')}`);
            return res.status(400).json({ message: `Campos obrigatórios ausentes: ${missingFields.join(', ')}` });
        }

        const updatedProduct = await productsRepository.updateProduct(id, updateData);
        
        if (!updatedProduct) {
            console.log(`Produto com id ${id} não encontrado`);
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        console.log('Produto atualizado com sucesso:', updatedProduct);
        res.json(updatedProduct);
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({ message: 'Erro ao atualizar produto', error: error.message });
    }
}

// Função para excluir um produto
async function deleteProduct(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10); // Obtém o ID do parâmetro da URL
        const result = await productsRepository.deleteProduct(id);
        res.status(200).json({ message: 'Produto excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        if (error.message === 'Produto não encontrado') {
            res.status(404).json({ message: 'Produto não encontrado' });
        } else {
            res.status(500).json({ message: 'Erro ao excluir produto', error: error.message });
        }
    }
}

module.exports = {
    getProduct,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
};
