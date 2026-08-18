import { Product } from '../models/product';
export declare class ProductRepository {
    private static products;
    findAll(): Promise<Product[]>;
    findById(id: number): Promise<Product | undefined>;
    create(data: Omit<Product, 'id'>): Promise<Product>;
}
//# sourceMappingURL=productRepository.d.ts.map