// Importação das dependências necessárias
const jwt = require('jsonwebtoken');         // Para geração de tokens JWT
const bcrypt = require('bcryptjs');          // Para criptografia de senhas
const settingsRepository = require('../repositories/settingsRepository');  // Repositório de configurações

// Função assíncrona para realizar o login
async function doLogin(req, res, next) {
    // Extrai email e senha do corpo da requisição
    const email = req.body.email;
    const password = req.body.password;

    // Busca as configurações do usuário pelo email
    const settings = await settingsRepository.getSettingsByEmail(email);

    if (settings) {
        // Verifica se a senha fornecida corresponde à senha hash armazenada
        const isValid = bcrypt.compareSync(password, settings.password);
        if (isValid) {
            // Gera um token JWT com o ID do usuário
            const token = jwt.sign({ id: settings.id }, process.env.JWT_SECRET, {
                expiresIn: parseInt(process.env.JWT_EXPIRES)
            })
            // Retorna o token para o cliente
            return res.json({ token });
        }
    }
    // Retorna status 401 (Não autorizado) se as credenciais forem inválidas
    res.sendStatus(401);
}

// Array para armazenar tokens invalidados (blacklist)
const blacklist = [];

// Função para realizar o logout
function doLogout(req, res, next) {
    // Obtém o token do cabeçalho da requisição
    const token = req.headers['authorization'];
    // Adiciona o token à blacklist
    blacklist.push(token);
    // Retorna status 200 (OK)
    res.sendStatus(200);
}

// Função para verificar se um token está na blacklist
function isBlacklisted(token) {
    return blacklist.some(t => t === token);
}

// Exporta as funções para uso em outros módulos
module.exports = {
    doLogin,
    doLogout,
    isBlacklisted
}