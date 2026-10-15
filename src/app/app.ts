import express from 'express';
import { apiRoutes } from './routes';

// Cria a aplicação Express e registra os módulos da API.
export function createApp() {
    const app = express();

    // Habilita o recebimento de JSON no corpo das requisições.
    app.use(express.json());

    // Todas as rotas registradas recebem o prefixo /api.
    app.use('/api', apiRoutes);

    return app;
}
