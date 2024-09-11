import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Função centralizada para criação dos headers
const createHeaders = (token) => ({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
});

const ProductService = {
    async createProduct(productData, token) {
        const productUrl = `${API_URL}/products`;

        console.log("Token:", token);
        console.log("Dados do produto:", productData);

        try {
            // Usando a função createHeaders para os headers
            const response = await axios.post(productUrl, productData, { headers: createHeaders(token) });
            console.log("Resposta da API:", response.data);
            return response.data;
        } catch (error) {
            console.error("Erro na requisição:", error.response ? error.response.data : error.message);
            throw error;
        }
    },

    async getProduct(token) {
        const productUrl = `${API_URL}/products`;

        console.log("Token:", token);

        try {
            // Usando a função createHeaders para os headers
            const response = await axios.get(productUrl, { headers: createHeaders(token) });
            return response.data;
        } catch (error) {
            console.error("Erro na requisição:", error.response ? error.response.data : error.message);
            throw error;
        }
    },

    async getAllProducts(token) {
        const productsUrl = `${API_URL}/products`;

        console.log("Token:", token);

        try {
            // Usando a função createHeaders para os headers
            const response = await axios.get(productsUrl, { headers: createHeaders(token) });
            console.log("Todos os produtos carregados:", response.data);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar todos os produtos:", error.response ? error.response.data : error.message);
            throw error;
        }
    },

    async updateProduct(id, productData, token) {
        const productUrl = `${API_URL}/products/${id}`;

        try {
            // Usando a função createHeaders para os headers
            const response = await axios.put(productUrl, productData, { headers: createHeaders(token) });
            return response.data;
        } catch (error) {
            console.error("Erro na atualização:", error.response ? error.response.data : error.message);
            throw error;
        }
    },

    async getProductById(id, token) {
        const productUrl = `${API_URL}/products/${id}`;

        console.log("Token:", token);
        console.log("Buscando produto com ID:", id);

        try {
            if (isNaN(id)) {
                throw new Error('ID inválido');
            }

            // Usando a função createHeaders para os headers
            const response = await axios.get(productUrl, { headers: createHeaders(token) });
            console.log("Dados do produto carregados:", response.data);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar produto:", error.response ? error.response.data : error.message);
            throw error;
        }
    }
};

export default ProductService;
