import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Exportação padrão
const ProductService = {
    async createProduct(productData, token) {
        const productUrl = `${API_URL}/product`;
        const headers = {
            'authorization': token,
            'Content-Type': 'application/json'
        };
        const response = await axios.post(productUrl, productData, { headers });
        return response.data;
    },

    async getProduct(token) {
        const productUrl = `${API_URL}/product`;
        const headers = {
            'authorization': token
        };
        const response = await axios.get(productUrl, { headers });
        return response.data;
    }
};

export default ProductService;
