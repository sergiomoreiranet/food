import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const ProductService = {
    async createProduct(productData, token) {
        const productUrl = `${API_URL}/products`;
        console.log("Token:", token); // Verifique o token
        console.log("Dados do produto:", productData); // Verifique os dados enviados
        
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        
        try {
            const response = await axios.post(productUrl, productData, { headers });
            console.log("Resposta da API:", response.data); // Verifique a resposta da API
            return response.data;
        } catch (error) {
            console.error("Erro na requisição:", error.response ? error.response.data : error.message);
            throw error; // Re-throw para tratamento no componente
        }
    },

    async getProduct(token) {
        const productUrl = `${API_URL}/products`;
        console.log("Token:", token); // Verifique o token
        
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        
        try {
            const response = await axios.get(productUrl, { headers });
            return response.data;
        } catch (error) {
            console.error("Erro na requisição:", error.response ? error.response.data : error.message);
            throw error; // Re-throw para tratamento no componente
        }
    }
};

export default ProductService;
