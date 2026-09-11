"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
// Repositório responsável por guardar e consultar dados de produtos em memória.
class ProductRepository {
    async findAll() {
        return ProductRepository.products;
    }
    async findById(id) {
        return ProductRepository.products.find(product => product.id === id);
    }
    async create(data) {
        const newId = ProductRepository.products.length > 0
            ? Math.max(...ProductRepository.products.map(product => product.id)) + 1
            : 1;
        const newProduct = {
            id: newId,
            ...data
        };
        ProductRepository.products.push(newProduct);
        return newProduct;
    }
}
exports.ProductRepository = ProductRepository;
ProductRepository.products = [
    { id: 1, name: 'Teclado Mecânico', price: 350.0, stock: 15 },
    { id: 2, name: 'Mouse Gamer', price: 150.0, stock: 30 },
    { id: 3, name: 'Monitor QHD 32"', price: 1800.0, stock: 5 }
];
//# sourceMappingURL=product.repository.js.map