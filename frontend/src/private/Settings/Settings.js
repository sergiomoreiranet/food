import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { getSettings, updateSettings } from '../../services/SettingsService';
import Menu from '../../components/Menu/Menu';

function Settings() {

    const inputEmail = useRef('');
    const inputNewPassword = useRef('');
    const inputConfirmPassword = useRef('');
    const inputPhone = useRef('');
    const inputName = useRef('');
    

    const history = useHistory('');

    const [error, setError] = useState('');

    const [success, setSuccess] = useState('');


    useEffect(() => {

        const token = localStorage.getItem('token');

        getSettings(token)
            .then(settings => {
                inputEmail.current.value = settings.email;
                inputPhone.current.value = settings.phone;
                inputName.current.value = settings.name;
                
            })
            .catch(err => {
                if (err.response && err.response.status === 401);
            })

    }, [])

    function onFormSubmit(event) {
        event.preventDefault();

         
        if ((inputNewPassword.current.value || inputConfirmPassword.current.value)
            && inputNewPassword.current.value !== inputConfirmPassword.current.value) {
                return setError(`Os campos Nova Senha e Confirmar Senha devem ser iguais.`);
        }
        
        const token = localStorage.getItem('token');
        updateSettings({
            email: inputEmail.current.value,
            password: inputNewPassword.current.value ? inputNewPassword.current.value : null,
            phone: inputPhone.current.value,
            name: inputName.current.value

        }, token)
        .then(result => {
            if(result){
                setError('');
                inputNewPassword.current.value = '';
                inputConfirmPassword.current.value = '';
                return setSuccess(`Configurações salvas com sucesso!`);
            }else{
                setSuccess('');
                return setError(`Não é possível atualizar as configurações.`);
            }
        })
        .catch(error => {
            setSuccess('');
            console.error(error.message);
            return setError(`Não é possível atualizar as configurações.`);
        })
    }

    return (
        <React.Fragment>
            <Menu />
            <main className="content">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                    <div className="d-block mb-4 mb-md-0">
                        <h1 className="h4">Configurações</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card card-body border-0 shadow mb-4">
                            <h2 className="h5 mb-4">Personalize suas Configurações</h2>
                            <form>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input ref={inputEmail} className="form-control" id="email" type="email" placeholder="name@gmail.com" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="phone">Telefone</label>
                                            <input ref={inputPhone} className="form-control" id="phone" type="text" placeholder="11-1234-56789" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div>
                                            <label htmlFor="inputNewPassword">Nova Senha</label>
                                            <input ref={inputNewPassword} className="form-control" id="inputNewPassword" type="password" placeholder="Digite sua nova senha" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div>
                                            <label htmlFor="inputConfirmPassword">Confirma sua Senha</label>
                                            <input ref={inputConfirmPassword} className="form-control" id="inputConfirmPassword" type="password" placeholder="Sua nova senha novamente" />
                                        </div>
                                    </div>
                                </div>
                                <h2 className="h5 my-4">Dados Pessoais</h2>
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="name">Seu nome</label>
                                            <input ref={inputName} className="form-control" id="name" type="text" placeholder="Digite seu nome" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap">
                                        <div className="col-sm-3">
                                            <button className="btn btn-gray-800 mt-2 animate-up-2" type="submit" onClick={onFormSubmit}>Save all</button>
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
    )
}

export default Settings;