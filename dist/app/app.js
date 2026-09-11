"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const product_routes_1 = require("../modules/products/product.routes");
// Cria a aplicação Express e registra os módulos da API.
function createApp() {
    const app = (0, express_1.default)();
    // Habilita o recebimento de JSON no corpo das requisições.
    app.use(express_1.default.json());
    // Monta as rotas da aplicação.
    app.use(product_routes_1.productRoutes);
    return app;
}
//# sourceMappingURL=app.js.map