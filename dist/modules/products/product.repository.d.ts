import { Product } from "./product.model";
export declare class ProductRepository {
    private static products;
    findAll(): Promise<Product[]>;
    findById(id: number): Promise<Product | undefined>;
    create(data: Omit<Product, "id">): Promise<Product>;
    update(id: number, data: Omit<Product, "id">): Promise<Product | undefined>;
    remove(id: number): Promise<boolean>;
}
//# sourceMappingURL=product.repository.d.ts.map