import { Request, Response } from 'express';
import { ProductService } from '../services/productService';
export declare class ProductController {
    private readonly productService;
    constructor(productService?: ProductService);
    listProducts: (_req: Request, res: Response) => Promise<Response>;
    createProduct: (req: Request, res: Response) => Promise<Response>;
}
//# sourceMappingURL=productController.d.ts.map