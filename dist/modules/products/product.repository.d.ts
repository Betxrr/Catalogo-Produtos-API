import { Product } from './product.model';
export declare class ProductRepository {
    private static products;
    findAll(): Promise<Product[]>;
    findById(id: number): Promise<Product | undefined>;
    create(data: Omit<Product, 'id'>): Promise<Product>;
}
//# sourceMappingURL=product.repository.d.ts.map