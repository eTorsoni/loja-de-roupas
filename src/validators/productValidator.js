// src/validators/productValidator.js

// Middleware para validar se os dados da roupa estão presentes
const validateProduct = (req, res, next) => {
    const { nome, preco, tamanho, cor } = req.body;

    if (!nome || !preco || !tamanho) {
        return res.status(400).json({ 
            message: "Erro: Campos obrigatórios faltando (nome, preco, tamanho)." 
        });
    }

    // Se tudo estiver ok, passa para o próximo passo (Controller)
    next();
};

module.exports = { validateProduct };