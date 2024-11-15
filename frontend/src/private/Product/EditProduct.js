import React, { useEffect, useState } from 'react';
import ProductService from '../../services/ProductService';
import Menu from '../../components/Menu/Menu';

function EditProduct() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token não encontrado');
                }
                const productsData = await ProductService.getAllProducts(token);
                setProducts(productsData);
                console.log("Produtos carregados:", productsData);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
                setError('Não foi possível carregar os produtos.');
            }
        }

        fetchProducts();
    }, []);

    const handleEditClick = (product) => {
        setSelectedProduct(product);
    };

    const handleDeleteClick = (id) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Token não encontrado. Por favor, faça login novamente.');
                return;
            }
            ProductService.deleteProduct(id, token)
                .then(() => {
                    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
                    setError('');
                    alert('Produto excluído com sucesso!');
                })
                .catch(error => {
                    console.error("Erro ao excluir produto:", error);
                    setError('Não foi possível excluir o produto. Por favor, tente novamente.');
                });
        }
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedProduct((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdateProduct = async () => {
        try {
            console.log("Iniciando atualização do produto");
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token não encontrado');
            }
            console.log("Token encontrado:", token);

            if (selectedProduct) {
                console.log("Produto selecionado para atualização:", selectedProduct);
            
            // Enviar dados atualizados para o ProductService
            const updatedProduct = await ProductService.updateProduct(selectedProduct.id, selectedProduct, token);
            
            console.log("Resposta do servidor após atualização:", updatedProduct);
            
            // Atualizar a lista de produtos com o produto atualizado
            setProducts(prevProducts => prevProducts.map(product =>
                product.id === updatedProduct.id ? updatedProduct : product
            ));
                setSelectedProduct(null);
                setError('');
                alert('Produto atualizado com sucesso!');
            } else {
                console.log("Nenhum produto selecionado para atualização");
            }
        } catch (error) {
            console.error("Erro detalhado ao atualizar produto:", error);
            setError('Não foi possível atualizar o produto: ' + error.message);
        }
    };

    return (
        <React.Fragment>
            <Menu />
            <main className="content">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                    <div className="d-block mb-4 mb-md-0">
                        <h1 className="h4">Lista de Produtos</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card card-body border-0 shadow mb-4">
                            <h2 className="h5 mb-4">Produtos Cadastrados</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Descrição</th>
                                        <th>Preço</th>
                                        <th>Categoria</th>
                                        <th className="text-center">Quantidade</th>
                                        <th className="text-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {products.map(product => {
                                        const displayProduct = selectedProduct && selectedProduct.id === product.id ? selectedProduct : product;
                                        return (
                                            <tr key={displayProduct.id}>
                                                <td>{displayProduct.id}</td>
                                                <td>{displayProduct.nome}</td>
                                                <td>{displayProduct.descricao}</td>
                                                <td>{displayProduct.preco}</td>
                                                <td>{displayProduct.categoria}</td>
                                                <td className="text-center">{displayProduct.quantidade}</td>
                                                <td className="text-center">
                                                    <button 
                                                        className="btn btn-primary btn-sm me-2" 
                                                        onClick={() => handleEditClick(displayProduct)} 
                                                        data-bs-toggle="modal" 
                                                        data-bs-target="#editProductModal">
                                                        Editar
                                                    </button>
                                                    <button 
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDeleteClick(displayProduct.id)}>
                                                        Excluir
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Modal de Edição */}
                <div className="modal fade" id="editProductModal" tabIndex="-1" aria-labelledby="editProductModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="editProductModalLabel">Editar Produto</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {selectedProduct && (
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Nome do Produto</label>
                                            <input type="text" className="form-control" id="name" name="nome" value={selectedProduct.nome} onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label">Descrição</label>
                                            <input type="text" className="form-control" id="description" name="descricao" value={selectedProduct.descricao} onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="price" className="form-label">Preço</label>
                                            <input type="number" className="form-control" id="price" name="preco" value={selectedProduct.preco} onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="category" className="form-label">Categoria</label>
                                            <input type="text" className="form-control" id="category" name="categoria" value={selectedProduct.categoria} onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="quantity" className="form-label">Quantidade</label>
                                            <input type="number" className="form-control" id="quantity" name="quantidade" value={selectedProduct.quantidade} onChange={handleInputChange} />
                                        </div>
                                    </form>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={handleUpdateProduct} data-bs-dismiss="modal">Salvar Alterações</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    );
}

export default EditProduct;
