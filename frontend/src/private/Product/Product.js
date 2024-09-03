import React, { useState, useRef } from 'react';
import ProductService from '../../services/ProductService';
import Menu from '../../components/Menu/Menu';

function Product() {
    const inputName = useRef('');
    const inputDescription = useRef('');
    const inputPrice = useRef('');
    const inputCategory = useRef('');
    const inputQuantity = useRef('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    async function onFormSubmit(event) {
        event.preventDefault();
        console.log("Formulário submetido");

        const token = localStorage.getItem('token');

        try {
            // Prepare o objeto productData com os nomes corretos
            const productData = {
                nome: inputName.current.value,
                descricao: inputDescription.current.value,
                preco: parseFloat(inputPrice.current.value),
                categoria: inputCategory.current.value,
                quantidade: parseInt(inputQuantity.current.value, 10)
            };

            console.log("Dados do produto:", productData);

            // Envie os dados para o serviço
            const result = await ProductService.createProduct(productData, token);

            console.log("Produto criado com sucesso:", result);
            setError('');
            setSuccess('Produto criado com sucesso!');
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            setSuccess('');
            setError('Não foi possível criar o produto.');
        }
    }

    return (
        <React.Fragment>
            <Menu />
            <main className="content">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                    <div className="d-block mb-4 mb-md-0">
                        <h1 className="h4">Cadastrar Produto</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card card-body border-0 shadow mb-4">
                            <h2 className="h5 mb-4">Preencha os dados do produto</h2>
                            <form onSubmit={onFormSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="name">Nome do Produto</label>
                                            <input ref={inputName} className="form-control" id="name" type="text" placeholder="Digite o nome do produto" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="description">Descrição</label>
                                            <input ref={inputDescription} className="form-control" id="description" type="text" placeholder="Digite a descrição do produto" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="price">Preço</label>
                                            <input ref={inputPrice} className="form-control" id="price" type="number" step="0.01" placeholder="Digite o preço" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="category">Categoria</label>
                                            <input ref={inputCategory} className="form-control" id="category" type="text" placeholder="Digite a categoria" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="quantity">Quantidade</label>
                                            <input ref={inputQuantity} className="form-control" id="quantity" type="number" placeholder="Digite a quantidade" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap">
                                        <div className="col-sm-3">
                                            <button className="btn btn-gray-800 mt-2 animate-up-2" type="submit">Cadastrar Produto</button>
                                        </div>
                                        
                                        {
                                            error ?
                                                <div className="alert alert-danger mt-2 col-9 py-2">{error}</div>
                                                : <React.Fragment></React.Fragment>
                                        }
                                        {
                                            success ?
                                                <div className="alert alert-success mt-2 col-9 py-2">{success}</div>
                                                : <React.Fragment></React.Fragment>
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    );
}

export default Product;
