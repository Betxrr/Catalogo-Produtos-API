import { Product } from '../models/product';
import { ProductRepository } from '../repositories/productRepository';
export declare class ProductService {
    private readonly productRepository;
    constructor(productRepository?: ProductRepository);
    getAllProducts(): Promise<Product[]>;
    createProduct(data: Partial<Product>): Promise<Product>;
}
//# sourceMappingURL=productService.d.ts.map