import { Product } from './product.model';
import { ProductRepository } from './product.repository';

// Camada de regra de negócio: valida entrada e orquestra o repositório.
export class ProductService {
    constructor(private readonly productRepository: ProductRepository = new ProductRepository()) {}

    async getAllProducts(): Promise<Product[]> {
        return this.productRepository.findAll();
    }

    async createProduct(data: Partial<Product>): Promise<Product> {
        const { name, price, stock } = data;

        if (typeof name !== 'string' || name.trim() === '') {
            throw new Error('Nome do produto é obrigatório.');
        }

        if (typeof price !== 'number' || Number.isNaN(price) || price <= 0) {
            throw new Error('Preço deve ser um número maior que zero.');
        }

        if (
            typeof stock !== 'number' ||
            Number.isNaN(stock) ||
            !Number.isInteger(stock) ||
            stock < 0
        ) {
            throw new Error('Estoque deve ser um número inteiro maior ou igual a zero.');
        }

        return this.productRepository.create({
            name: name.trim(),
            price,
            stock
        });
    }
}
