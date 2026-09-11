import { Product } from './product.model';
import { ProductRepository } from './product.repository';
export declare class ProductService {
    private readonly productRepository;
    constructor(productRepository?: ProductRepository);
    getAllProducts(): Promise<Product[]>;
    createProduct(data: Partial<Product>): Promise<Product>;
}
//# sourceMappingURL=product.service.d.ts.map