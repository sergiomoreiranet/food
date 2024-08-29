import React, { useState, useEffect } from 'react';
import { getTable, createTable, updateTable, deleteTable } from '../../services/tableService';
import Menu from '../../components/Menu/Menu';
import { Button, Form, Alert } from 'react-bootstrap'; // Exemplo com react-bootstrap

function TableComponent() {
    const [table, setTable] = useState(null);
    const [newTableData, setNewTableData] = useState({
        numero: '',
        idAtendente: '',
        status: false,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchTable = async () => {
            try {
                const data = await getTable(1, token); // Obtém a tabela com id 1
                setTable(data);
            } catch (err) {
                setError('Erro ao buscar dados da tabela');
            }
        };
        fetchTable();
    }, [token]);

    const handleCreate = async () => {
        try {
            const data = await createTable(newTableData, token);
            setTable(data);
            setSuccess('Tabela criada com sucesso!');
        } catch (err) {
            setError('Erro ao criar tabela');
        }
    };

    const handleUpdate = async () => {
        try {
            const data = await updateTable(table.id, newTableData, token);
            setTable(data);
            setSuccess('Tabela atualizada com sucesso!');
        } catch (err) {
            setError('Erro ao atualizar tabela');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTable(table.id, token);
            setTable(null);
            setSuccess('Tabela deletada com sucesso!');
        } catch (err) {
            setError('Erro ao deletar tabela');
        }
    };

    return (
        <React.Fragment>
            <Menu />
            <main className="content">
                <div className="container">
                    <h1>Dados da Tabela</h1>
                    {table ? (
                        <div className="table-details">
                            <p><strong>Número:</strong> {table.numero}</p>
                            <p><strong>ID Atendente:</strong> {table.idAtendente}</p>
                            <p><strong>Status:</strong> {table.status ? 'Ativo' : 'Inativo'}</p>

                            <Button variant="warning" onClick={handleUpdate}>Atualizar</Button>
                            <Button variant="danger" onClick={handleDelete}>Deletar</Button>
                        </div>
                    ) : (
                        <p>Nenhuma tabela encontrada</p>
                    )}

                    <h2>Criar Nova Tabela</h2>
                    <Form>
                        <Form.Group controlId="formNumero">
                            <Form.Label>Número</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTableData.numero}
                                onChange={(e) => setNewTableData({ ...newTableData, numero: e.target.value })}
                                placeholder="Número"
                            />
                        </Form.Group>

                        <Form.Group controlId="formIdAtendente">
                            <Form.Label>ID Atendente</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTableData.idAtendente}
                                onChange={(e) => setNewTableData({ ...newTableData, idAtendente: e.target.value })}
                                placeholder="ID Atendente"
                            />
                        </Form.Group>

                        <Form.Group controlId="formStatus">
                            <Form.Check
                                type="checkbox"
                                label="Ativo"
                                checked={newTableData.status}
                                onChange={(e) => setNewTableData({ ...newTableData, status: e.target.checked })}
                            />
                        </Form.Group>

                        <Button variant="primary" onClick={handleCreate}>Criar</Button>
                    </Form>

                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                </div>
            </main>
        </React.Fragment>
    );
}

export default TableComponent;
