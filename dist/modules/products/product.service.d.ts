import { Product } from './product.model';
import { ProductRepository } from './product.repository';
export declare class ProductService {
    private readonly productRepository;
    constructor(productRepository?: ProductRepository);
    getAllProducts(): Promise<Product[]>;
    getProductById(id: number): Promise<Product>;
    createProduct(data: Partial<Product>): Promise<Product>;
    updateProduct(id: number, data: Partial<Product>): Promise<Product>;
    deleteProduct(id: number): Promise<void>;
    private validateProduct;
}
//# sourceMappingURL=product.service.d.ts.map