"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const productRepository_1 = require("../repositories/productRepository");
const productRoutes = (0, express_1.Router)();
exports.productRoutes = productRoutes;
const productRepository = new productRepository_1.ProductRepository();
productRoutes.get('/products', async (req, res) => {
    try {
        const products = await productRepository.findAll();
        return res.status(200).json(products);
    }
    catch (error) {
        return res.status(500).json({ error: 'Erro interno ao buscar produtos.' });
    }
});
productRoutes.post('/products', async (req, res) => {
    try {
        const { name, price, stock } = req.body;
        if (!name || typeof price !== 'number' || typeof stock !== 'number') {
            return res.status(400).json({ error: 'Dados inválidos. Verifique name, price e stock.' });
        }
        const newProduct = await productRepository.create({ name, price, stock });
        return res.status(201).json(newProduct);
    }
    catch (error) {
        return res.status(500).json({ error: 'Erro interno ao criar produto.' });
    }
});
//# sourceMappingURL=productRoutes.js.map