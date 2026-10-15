import { Product } from './product.model';
import { ProductRepository } from './product.repository';

// Camada de regra de negócio: valida entrada e orquestra o repositório.
export class ProductService {
    constructor(private readonly productRepository: ProductRepository = new ProductRepository()) {}

    // Leitura: o service delega a consulta ao repositório.
    async getAllProducts(): Promise<Product[]> {
        return this.productRepository.findAll();
    }

    // Busca um produto e transforma ausência de resultado em erro de negócio.
    async getProductById(id: number): Promise<Product> {
        const product = await this.productRepository.findById(id);

        if (!product) {
            throw new Error('Produto não encontrado.');
        }

        return product;
    }

    // Criação: valida os campos antes de pedir ao repositório para salvar.
    async createProduct(data: Partial<Product>): Promise<Product> {
        const productData = this.validateProduct(data);

        return this.productRepository.create(productData);
    }

    // Atualização: exige os campos válidos e informa se o ID não foi encontrado.
    async updateProduct(id: number, data: Partial<Product>): Promise<Product> {
        const productData = this.validateProduct(data);
        const updatedProduct = await this.productRepository.update(id, productData);

        if (!updatedProduct) {
            throw new Error('Produto não encontrado.');
        }

        return updatedProduct;
    }

    // Exclusão: o repositório informa se encontrou e removeu o produto.
    async deleteProduct(id: number): Promise<void> {
        const deleted = await this.productRepository.remove(id);

        if (!deleted) {
            throw new Error('Produto não encontrado.');
        }
    }

    // Regra comum de criação e atualização: nome, preço e estoque válidos.
    private validateProduct(data: Partial<Product>): Omit<Product, 'id'> {
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

        return {
            name: name.trim(),
            price,
            stock
        };
    }
}
