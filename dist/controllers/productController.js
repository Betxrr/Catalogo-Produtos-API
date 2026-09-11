"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const productService_1 = require("../services/productService");
// Controlador responsável por receber a requisição HTTP e devolver a resposta.
class ProductController {
    constructor(productService = new productService_1.ProductService()) {
        this.productService = productService;
        /* ------------------------------------------------ *
         * Listagem de produtos
         * ------------------------------------------------ */
        // Lista todos os produtos cadastrados.
        this.listProducts = async (_req, res) => {
            try {
                const products = await this.productService.getAllProducts();
                return res.status(200).json(products);
            }
            catch (error) {
                return res.status(500).json({
                    error: 'Erro interno ao buscar produtos.'
                });
            }
        };
        /* ------------------------------------------------ *
         * Criação de produtos
         * ------------------------------------------------ */
        // Cria um novo produto com validação de dados de entrada.
        this.createProduct = async (req, res) => {
            try {
                const newProduct = await this.productService.createProduct(req.body);
                return res.status(201).json(newProduct);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Erro interno ao criar produto.';
                const statusCode = message.includes('obrigatório') ||
                    message.includes('maior que zero') ||
                    message.includes('inteiro')
                    ? 400
                    : 500;
                return res.status(statusCode).json({ error: message });
            }
        };
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=productController.js.map