import React, { useState } from 'react';
import ProductService from '../../services/ProductService'; // Ajuste o caminho conforme necessário
import Menu from '../../components/Menu/Menu';
import '../ProductForm.css';

function ProductForm() {
    const [product, setProduct] = useState({
        nome: '',
        descricao: '',
        preco: '',
        categoria: '',
        quantidade: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        alert("Formulário enviado!"); // Adicione isto para verificar se a submissão está ocorrendo
        console.log("Produto:", product);
        try {
            const token = 'your-auth-token'; // Substitua pelo seu token de autenticação
            await ProductService.createProduct(product, token);
            alert('Produto cadastrado com sucesso!');
            setProduct({
                nome: '',
                descricao: '',
                preco: '',
                categoria: '',
                quantidade: ''
            });
        } catch (error) {
            console.error('Erro ao cadastrar o produto:', error);
            alert('Erro ao cadastrar o produto.');
        }
    };

    return (
        <React.Fragment>
            <Menu />
            <main className="content">
                <div className="form-container">
                    <h1>Cadastrar Produto</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="nome">Nome do Produto:</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={product.nome}
                                onChange={handleChange}
                                placeholder="Nome do produto"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="descricao">Descrição:</label>
                            <textarea
                                id="descricao"
                                name="descricao"
                                value={product.descricao}
                                onChange={handleChange}
                                placeholder="Descrição do produto"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="preco">Preço:</label>
                            <input
                                type="number"
                                id="preco"
                                name="preco"
                                value={product.preco}
                                onChange={handleChange}
                                placeholder="Preço do produto"
                                step="0.01"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="categoria">Categoria:</label>
                            <input
                                type="text"
                                id="categoria"
                                name="categoria"
                                value={product.categoria}
                                onChange={handleChange}
                                placeholder="Categoria do produto"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="quantidade">Quantidade:</label>
                            <input
                                type="number"
                                id="quantidade"
                                name="quantidade"
                                value={product.quantidade}
                                onChange={handleChange}
                                placeholder="Quantidade disponível"
                            />
                        </div>
                        <button type="submit" className="submit-button">Cadastrar</button>
                    </form>
                </div>
            </main>
        </React.Fragment>
    );
}

export default ProductForm;