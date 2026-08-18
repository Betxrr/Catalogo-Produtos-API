// src/server.ts
import express from 'express';
import { productRoutes } from './routes/productRoutes';

const app = express();

// Habilita o recebimento de JSON no corpo das requisições
app.use(express.json());

// Registra as rotas da aplicação
app.use(productRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});