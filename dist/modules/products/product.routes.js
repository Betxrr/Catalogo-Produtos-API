"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const productRoutes = (0, express_1.Router)();
exports.productRoutes = productRoutes;
const productController = new product_controller_1.ProductController();
productRoutes.get('/products', productController.listProducts);
productRoutes.post('/products', productController.createProduct);
//# sourceMappingURL=product.routes.js.map