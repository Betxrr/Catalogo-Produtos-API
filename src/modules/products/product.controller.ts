import { Request, Response } from 'express';
import { ProductService } from './product.service';

// Controller que conversa com o Express e entrega resposta HTTP.

export class ProductController {
    constructor(private readonly productService: ProductService = new ProductService()) {}

    listProducts = async (_req: Request, res: Response): Promise<Response> => {
        try {
            const products = await this.productService.getAllProducts();
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({
                error: 'Erro interno ao buscar produtos.'
            });
        }
    };


    createProduct = async (req: Request, res: Response): Promise<Response> => {
        try {
            const newProduct = await this.productService.createProduct(req.body);
            return res.status(201).json(newProduct);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erro interno ao criar produto.';
            const statusCode = message.includes('obrigatório') || message.includes('maior que zero') || message.includes('inteiro') ? 400 : 500;

            return res.status(statusCode).json({ error: message });
        }
    };
}
