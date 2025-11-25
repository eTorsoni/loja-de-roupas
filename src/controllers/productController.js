// src/controllers/productController.js
const supabase = require('../config/supabase.js');

const productController = {
    // CREATE - Criar uma nova roupa
    async createProduct(req, res) {
        const { nome, descricao, preco, tamanho, cor, estoque } = req.body;
        
        const { data, error } = await supabase
            .from('produtos')
            .insert([{ nome, descricao, preco, tamanho, cor, estoque }])
            .select();

        if (error) return res.status(500).json({ error: error.message });
        
        return res.status(201).json({ message: "Produto criado com sucesso!", data });
    },

    // READ - Listar todas as roupas
    async getAllProducts(req, res) {
        const { data, error } = await supabase
            .from('produtos')
            .select('*');

        if (error) return res.status(500).json({ error: error.message });

        return res.status(200).json(data);
    },

    // READ (ID) - Buscar roupa específica
    async getProductById(req, res) {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('produtos')
            .select('*')
            .eq('id', id)
            .single();

        if (error) return res.status(404).json({ message: "Produto não encontrado" });

        return res.status(200).json(data);
    },

    // UPDATE - Atualizar dados de uma roupa
    async updateProduct(req, res) {
        const { id } = req.params;
        const updates = req.body;

        const { data, error } = await supabase
            .from('produtos')
            .update(updates)
            .eq('id', id)
            .select();

        if (error) return res.status(500).json({ error: error.message });

        return res.status(200).json({ message: "Produto atualizado!", data });
    },

    // DELETE - Deletar uma roupa
    async deleteProduct(req, res) {
        const { id } = req.params;

        const { error } = await supabase
            .from('produtos')
            .delete()
            .eq('id', id);

        if (error) return res.status(500).json({ error: error.message });

        return res.status(200).json({ message: "Produto deletado com sucesso!" });
    }
};

module.exports = productController;