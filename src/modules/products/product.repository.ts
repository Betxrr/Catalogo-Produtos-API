import { Product } from './product.model';

// Repositório responsável por guardar e consultar dados de produtos em memória.
export class ProductRepository {
    private static products: Product[] = [
        { id: 1, name: 'Teclado Mecânico', price: 350.0, stock: 15 },
        { id: 2, name: 'Mouse Gamer', price: 150.0, stock: 30 },
        { id: 3, name: 'Monitor QHD 32"', price: 1800.0, stock: 5 }
    ];

    async findAll(): Promise<Product[]> {
        return ProductRepository.products;
    }

    async findById(id: number): Promise<Product | undefined> {
        return ProductRepository.products.find(product => product.id === id);
    }

    async create(data: Omit<Product, 'id'>): Promise<Product> {
        const newId = ProductRepository.products.length > 0
            ? Math.max(...ProductRepository.products.map(product => product.id)) + 1
            : 1;

        const newProduct: Product = {
            id: newId,
            ...data
        };

        ProductRepository.products.push(newProduct);
        return newProduct;
    }
}
