import { Router } from 'express';
import { ProductController } from './product.controller';

const productRoutes = Router();
const productController = new ProductController();

// GET: consulta produtos, com ou sem filtro por ID.
productRoutes.get('/products', productController.listProducts);
productRoutes.get('/products/:id', productController.getProductById);

// POST: cria um produto usando os dados enviados no corpo da requisição.
productRoutes.post('/products', productController.createProduct);

// PUT e DELETE: alteram ou removem o produto identificado pelo ID da URL.
productRoutes.put('/products/:id', productController.updateProduct);
productRoutes.delete('/products/:id', productController.deleteProduct);

export { productRoutes };
