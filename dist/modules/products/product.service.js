"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_repository_1 = require("./product.repository");
// Camada de regra de negócio: valida entrada e orquestra o repositório.
class ProductService {
    constructor(productRepository = new product_repository_1.ProductRepository()) {
        this.productRepository = productRepository;
    }
    async getAllProducts() {
        return this.productRepository.findAll();
    }
    async createProduct(data) {
        const { name, price, stock } = data;
        if (typeof name !== 'string' || name.trim() === '') {
            throw new Error('Nome do produto é obrigatório.');
        }
        if (typeof price !== 'number' || Number.isNaN(price) || price <= 0) {
            throw new Error('Preço deve ser um número maior que zero.');
        }
        if (typeof stock !== 'number' ||
            Number.isNaN(stock) ||
            !Number.isInteger(stock) ||
            stock < 0) {
            throw new Error('Estoque deve ser um número inteiro maior ou igual a zero.');
        }
        return this.productRepository.create({
            name: name.trim(),
            price,
            stock
        });
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map