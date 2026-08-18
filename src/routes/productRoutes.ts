import { Router } from 'express';
import { ProductRepository } from '../repositories/productRepository';

const productRoutes = Router();
const productRepository = new ProductRepository();

productRoutes.get('/products', async (req, res) => {
    try {
        const products = await productRepository.findAll();
        return res.status(200).json(products);
    } catch (error) {
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
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno ao criar produto.' });
    }
});

export { productRoutes };