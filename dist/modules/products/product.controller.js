"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
// Recebe requisições do Express, chama o service e monta respostas HTTP.
class ProductController {
    constructor(productService = new product_service_1.ProductService()) {
        this.productService = productService;
        // GET /products: devolve a lista de produtos.
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
        // GET /products/:id: valida o ID da URL e devolve o produto encontrado.
        this.getProductById = async (req, res) => {
            const id = this.parseProductId(req.params.id);
            if (id === null) {
                return res.status(400).json({ error: 'ID do produto deve ser um inteiro positivo.' });
            }
            try {
                const product = await this.productService.getProductById(id);
                return res.status(200).json(product);
            }
            catch (error) {
                return this.handleError(res, error, 'Erro interno ao buscar produto.');
            }
        };
        // POST /products: envia os campos recebidos no JSON para criação.
        this.createProduct = async (req, res) => {
            try {
                const newProduct = await this.productService.createProduct(req.body);
                return res.status(201).json(newProduct);
            }
            catch (error) {
                return this.handleError(res, error, 'Erro interno ao criar produto.');
            }
        };
        // PUT /products/:id: atualiza o produto com o ID e os campos do JSON.
        this.updateProduct = async (req, res) => {
            const id = this.parseProductId(req.params.id);
            if (id === null) {
                return res.status(400).json({ error: 'ID do produto deve ser um inteiro positivo.' });
            }
            try {
                const product = await this.productService.updateProduct(id, req.body);
                return res.status(200).json(product);
            }
            catch (error) {
                return this.handleError(res, error, 'Erro interno ao atualizar produto.');
            }
        };
        // DELETE /products/:id: remove o produto e responde sem conteúdo (204).
        this.deleteProduct = async (req, res) => {
            const id = this.parseProductId(req.params.id);
            if (id === null) {
                return res.status(400).json({ error: 'ID do produto deve ser um inteiro positivo.' });
            }
            try {
                await this.productService.deleteProduct(id);
                return res.status(204).send();
            }
            catch (error) {
                return this.handleError(res, error, 'Erro interno ao remover produto.');
            }
        };
    }
    // Parâmetros de URL chegam como texto; aqui garantimos um ID inteiro positivo.
    parseProductId(rawId) {
        if (typeof rawId !== 'string') {
            return null;
        }
        const id = Number(rawId);
        return Number.isSafeInteger(id) && id > 0 ? id : null;
    }
    // Converte erros de validação e de produto inexistente em status HTTP adequados.
    handleError(res, error, fallbackMessage) {
        const message = error instanceof Error ? error.message : fallbackMessage;
        const isValidationError = message.includes('obrigatório') ||
            message.includes('maior que zero') ||
            message.includes('inteiro maior ou igual a zero');
        const statusCode = message === 'Produto não encontrado.' ? 404 : isValidationError ? 400 : 500;
        return res.status(statusCode).json({ error: statusCode === 500 ? fallbackMessage : message });
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map