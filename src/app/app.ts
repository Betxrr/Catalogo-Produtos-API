import express from 'express';
import { productRoutes } from '../modules/products/product.routes';

// Cria a aplicação Express e registra os módulos da API.
export function createApp() {
    const app = express();

    // Habilita o recebimento de JSON no corpo das requisições.
    app.use(express.json());

    // Monta as rotas da aplicação.
    app.use(productRoutes);

    return app;
}
