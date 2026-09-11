import { Router } from 'express';
import { ProductController } from './product.controller';

const productRoutes = Router();
const productController = new ProductController();

productRoutes.get('/products', productController.listProducts);
productRoutes.post('/products', productController.createProduct);

export { productRoutes };
