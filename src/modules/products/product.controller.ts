import { Request, Response } from 'express';
import { ProductService } from './product.service';

// Controlador responsável por receber requisições do Express, chamar o service e montar respostas HTTP.

export class ProductController {
    constructor(private readonly productService: ProductService = new ProductService()) {}


    //-------------------------------------------------------------------

    // Lista todos os produtos.

    // GET /products: devolve a lista de produtos.
    listProducts = async (_req: Request, res: Response): Promise<Response> => {
        try {
            const products = await this.productService.getAllProducts();
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({
                error: 'Erro interno ao buscar produtos.'
            });
        }
    };

    //-------------------------------------------------------------------

    // Busca um produto pelo ID.

    // GET /products/:id: valida o ID da URL e devolve o produto encontrado.
    getProductById = async (req: Request, res: Response): Promise<Response> => {
        const id = this.parseProductId(req.params.id);
        if (id === null) {
            return res.status(400).json({ error: 'ID do produto deve ser um inteiro positivo.' });
        }

        try {
            const product = await this.productService.getProductById(id);
            return res.status(200).json(product);
        } catch (error) {
            return this.handleError(res, error, 'Erro interno ao buscar produto.');
        }
    };
    //-------------------------------------------------------------------

    // Recebe os dados de criação de um novo produto.

    // POST /products: envia os campos recebidos no JSON para criação.
    createProduct = async (req: Request, res: Response): Promise<Response> => {
        try {
            const newProduct = await this.productService.createProduct(req.body);
            return res.status(201).json(newProduct);
        } catch (error) {
            return this.handleError(res, error, 'Erro interno ao criar produto.');
        }
    };

    //-------------------------------------------------------------------

    // Atualiza um produto existente.
    
    // PUT /products/:id: atualiza o produto com o ID e os campos do JSON.
    updateProduct = async (req: Request, res: Response): Promise<Response> => {
        const id = this.parseProductId(req.params.id);
        if (id === null) {
            return res.status(400).json({ error: 'ID do produto deve ser um inteiro positivo.' });
        }

        try {
            const product = await this.productService.updateProduct(id, req.body);
            return res.status(200).json(product);
        } catch (error) {
            return this.handleError(res, error, 'Erro interno ao atualizar produto.');
        }
    };

    //-------------------------------------------------------------------

    // Remove um produto pelo ID.

    // DELETE /products/:id: remove o produto e responde sem conteúdo (204).
    deleteProduct = async (req: Request, res: Response): Promise<Response> => {
        const id = this.parseProductId(req.params.id);
        if (id === null) {
            return res.status(400).json({ error: 'ID do produto deve ser um inteiro positivo.' });
        }

        try {
            await this.productService.deleteProduct(id);
            return res.status(204).send();
        } catch (error) {
            return this.handleError(res, error, 'Erro interno ao remover produto.');
        }
    };

    //-------------------------------------------------------------------

    // Analisa e valida o ID do produto a partir dos parâmetros da URL.

    // Parâmetros de URL chegam como texto; aqui garantimos um ID inteiro positivo.
    private parseProductId(rawId: string | string[] | undefined): number | null { 
        if (typeof rawId !== 'string') {
            return null;
        }

        const id = Number(rawId);
        return Number.isSafeInteger(id) && id > 0 ? id : null;
    }

    //-------------------------------------------------------------------

    // Trata erros de validação e de produto inexistente.

    // Converte erros de validação e de produto inexistente em status HTTP adequados.
    private handleError(res: Response, error: unknown, fallbackMessage: string): Response {
        const message = error instanceof Error ? error.message : fallbackMessage;
        const isValidationError =
            message.includes('obrigatório') ||
            message.includes('maior que zero') ||
            message.includes('inteiro maior ou igual a zero');
        const statusCode = message === 'Produto não encontrado.' ? 404 : isValidationError ? 400 : 500;

        return res.status(statusCode).json({ error: statusCode === 500 ? fallbackMessage : message });
    }
}
