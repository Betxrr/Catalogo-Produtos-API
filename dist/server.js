"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Base de dados temporária em memória
let produtos = [
    {
        id: 1,
        nome: "Mouse Gamer",
        preco: 150.00,
        descricao: "Mouse óptico de alta precisão",
        categoria: "Periféricos"
    },
    {
        id: 2,
        nome: "Teclado Mecânico",
        preco: 250.00,
        descricao: "Teclado RGB com switches lineares",
        categoria: "Periféricos"
    }
];
// ============================================================================
// ROTAS DA API (ENDPOINTS)
// ============================================================================
// GET /produtos - Listagem geral
app.get('/produtos', (req, res) => {
    return res.status(200).json(produtos);
});
// GET /produtos/:id - Busca por identificador único
app.get('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    const produto = produtos.find(p => p.id === id);
    if (!produto) {
        return res.status(404).json({ mensagem: "Produto não encontrado." });
    }
    return res.status(200).json(produto);
});
// POST /produtos - Cadastro de novo produto
app.post('/produtos', (req, res) => {
    const { nome, preco, descricao, categoria } = req.body;
    // Validação simples de preenchimento
    if (!nome || !preco) {
        return res.status(400).json({ mensagem: "Nome e preço são obrigatórios." });
    }
    const ultimoId = produtos.length > 0 ? produtos[produtos.length - 1]?.id ?? 0 : 0;
    const novoProduto = {
        // Gera um ID incremental com base no último item da lista
        id: ultimoId + 1,
        nome,
        preco,
        descricao: descricao || "",
        categoria: categoria || "Geral"
    };
    produtos.push(novoProduto);
    return res.status(201).json(novoProduto);
});
// PUT /produtos/:id - Atualização de produto existente
app.put('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    const { nome, preco, descricao, categoria } = req.body;
    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ mensagem: "Produto não encontrado." });
    }
    const produtoAtual = produtos[index];
    if (!produtoAtual) {
        return res.status(404).json({ mensagem: "Produto não encontrado." });
    }
    // Atualiza apenas os campos enviados ou mantém os valores atuais
    produtos[index] = {
        ...produtoAtual,
        nome: nome ?? produtoAtual.nome,
        preco: preco ?? produtoAtual.preco,
        descricao: descricao ?? produtoAtual.descricao,
        categoria: categoria ?? produtoAtual.categoria
    };
    return res.status(200).json(produtos[index]);
});
// DELETE /produtos/:id - Remoção de produto
app.delete('/produtos/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ mensagem: "Produto não encontrado." });
    }
    produtos.splice(index, 1);
    return res.status(200).json({ mensagem: "Produto removido com sucesso." });
});
// 5. Inicialização do servidor HTTP
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map