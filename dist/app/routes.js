"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoutes = void 0;
const express_1 = require("express");
const product_routes_1 = require("../modules/products/product.routes");
// Centraliza o registro das rotas do sistema.
exports.apiRoutes = (0, express_1.Router)();
exports.apiRoutes.use(product_routes_1.productRoutes);
//# sourceMappingURL=routes.js.map