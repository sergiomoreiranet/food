const { isBlacklisted } = require('../controllers/authController');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Extrair o cabeçalho Authorization
    const authHeader = req.headers['authorization'];

    // Verificar se o cabeçalho está presente e no formato correto
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1]; // Remove 'Bearer ' do token

        try {
            // Verificar o token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Verificar se o token está na lista negra
            if (!isBlacklisted(token)) {
                // Adicionar os dados decodificados ao local da resposta
                res.locals.token = decoded;
                return next();
            } else {
                return res.sendStatus(403); // Token está na lista negra
            }
        } catch (err) {
            console.error("Erro ao verificar o token:", err);
            return res.sendStatus(401); // Token inválido
        }
    } else {
        // Cabeçalho Authorization não fornecido ou no formato incorreto
        return res.sendStatus(401);
    }
};