"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
// Cria a aplicação Express e registra os módulos da API.
function createApp() {
    const app = (0, express_1.default)();
    // Habilita o recebimento de JSON no corpo das requisições.
    app.use(express_1.default.json());
    // Todas as rotas registradas recebem o prefixo /api.
    app.use('/api', routes_1.apiRoutes);
    return app;
}
//# sourceMappingURL=app.js.map