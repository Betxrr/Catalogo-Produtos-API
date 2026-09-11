import { Router } from 'express';
import { productRoutes } from '../modules/products/product.routes';

// Centraliza o registro das rotas do sistema.
export const apiRoutes = Router();

apiRoutes.use(productRoutes);
