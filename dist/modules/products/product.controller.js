"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
// Controller que conversa com o Express e entrega resposta HTTP.
class ProductController {
    constructor(productService = new product_service_1.ProductService()) {
        this.productService = productService;
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
        this.createProduct = async (req, res) => {
            try {
                const newProduct = await this.productService.createProduct(req.body);
                return res.status(201).json(newProduct);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Erro interno ao criar produto.';
                const statusCode = message.includes('obrigatório') || message.includes('maior que zero') || message.includes('inteiro') ? 400 : 500;
                return res.status(statusCode).json({ error: message });
            }
        };
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map