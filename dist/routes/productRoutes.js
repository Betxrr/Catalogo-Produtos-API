"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
// Router da API: define as rotas públicas do módulo de produtos.
const productRoutes = (0, express_1.Router)();
exports.productRoutes = productRoutes;
const productController = new productController_1.ProductController();
// GET /products -> lista todos os produtos.
productRoutes.get('/products', productController.listProducts);
// POST /products -> cria um novo produto.
productRoutes.post('/products', productController.createProduct);
//# sourceMappingURL=productRoutes.js.map