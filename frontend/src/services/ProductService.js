import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const ProductService = {
    async createProduct(productData, token) {
        const productUrl = `${API_URL}/products`; // Certifique-se de que a URL está correta
        const headers = {
            'Authorization': `Bearer ${token}`, // Certifique-se de que o cabeçalho está correto
            'Content-Type': 'application/json'
        };
        const response = await axios.post(productUrl, productData, { headers });
        return response.data;
    },

    async getProduct(token) {
        const productUrl = `${API_URL}/products`; // Certifique-se de que a URL está correta
        const headers = {
            'Authorization': `Bearer ${token}` // Certifique-se de que o cabeçalho está correto
        };
        const response = await axios.get(productUrl, { headers });
        return response.data;
    }
};

export default ProductService;
