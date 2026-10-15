"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const productRoutes = (0, express_1.Router)();
exports.productRoutes = productRoutes;
const productController = new product_controller_1.ProductController();
// GET: consulta produtos, com ou sem filtro por ID.
productRoutes.get('/products', productController.listProducts);
productRoutes.get('/products/:id', productController.getProductById);
// POST: cria um produto usando os dados enviados no corpo da requisição.
productRoutes.post('/products', productController.createProduct);
// PUT e DELETE: alteram ou removem o produto identificado pelo ID da URL.
productRoutes.put('/products/:id', productController.updateProduct);
productRoutes.delete('/products/:id', productController.deleteProduct);
//# sourceMappingURL=product.routes.js.map