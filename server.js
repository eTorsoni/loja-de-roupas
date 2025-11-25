// src/server.js
const express = require('express');
const cors = require('cors');
//const productRoutes = require('.src/routes/productRouters');
const productRoutes = require('./src/routes/productRouters');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares (Configurações básicas)
app.use(cors()); // Permite que o frontend acesse o backend
app.use(express.json()); // Permite receber JSON no corpo das requisições

// Rota de teste simples
app.get('/', (req, res) => {
    res.send('API da Loja de Roupas está rodando!');
});

// Usar as rotas de produtos
app.use('/api/produtos', productRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});