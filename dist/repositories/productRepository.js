"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
// Repositório responsável por guardar e consultar os dados em memória.
// Como é um exemplo simples, os produtos ficam em um array estático da classe.
class ProductRepository {
    // Retorna a lista completa de produtos.
    async findAll() {
        return ProductRepository.products;
    }
    // Busca um produto pelo ID.
    async findById(id) {
        return ProductRepository.products.find(p => p.id === id);
    }
    // Cria um novo produto e gera um ID automático.
    async create(data) {
        const newId = ProductRepository.products.length > 0
            ? Math.max(...ProductRepository.products.map(p => p.id)) + 1
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
    { id: 1, name: 'Teclado Mecânico', price: 350.00, stock: 15 },
    { id: 2, name: 'Mouse Gamer', price: 150.00, stock: 30 },
    { id: 3, name: 'Monitor QHD 32"', price: 1800.00, stock: 5 }
];
//# sourceMappingURL=productRepository.js.map