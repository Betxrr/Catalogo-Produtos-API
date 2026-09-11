import { Request, Response } from 'express';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService?: ProductService);
    listProducts: (_req: Request, res: Response) => Promise<Response>;
    createProduct: (req: Request, res: Response) => Promise<Response>;
}
//# sourceMappingURL=product.controller.d.ts.map