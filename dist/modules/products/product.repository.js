"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const mssql_1 = __importDefault(require("mssql"));
const database_1 = require("../../config/database");
const environment_1 = require("../../config/environment");
// Acessa os produtos no SQL Server ou na lista em memória usada para testes.
class ProductRepository {
    // Lista todos os produtos na fonte de dados ativa.
    async findAll() {
        // Fonte mockada
        if (environment_1.useMock) {
            return ProductRepository.products;
        }
        // Consulta SQL
        // Obs: os aliases mantem o retorno no formato esperado pela API.
        const pool = await (0, database_1.connectToDatabase)();
        const result = await pool
            .request()
            .query("SELECT id, nome AS name, preco AS price, estoque AS stock FROM produtos ORDER BY id");
        return result.recordset;
    }
    // Busca um produto; undefined significa que o ID não existe.
    async findById(id) {
        // Fonte mockada
        if (environment_1.useMock) {
            return ProductRepository.products.find((product) => product.id === id);
        }
        // Consulta SQL parametrizada
        const pool = await (0, database_1.connectToDatabase)();
        const result = await pool
            .request()
            .input("id", mssql_1.default.Int, id)
            .query("SELECT id, nome AS name, preco AS price, estoque AS stock FROM produtos WHERE id = @id");
        return result.recordset[0];
    }
    // Cria um produto e devolve o registro já com o ID atribuído.
    async create(data) {
        // Inserir no SQL Server
        // Obs: OUTPUT retorna o produto com o ID gerado pelo banco.
        if (!environment_1.useMock) {
            const pool = await (0, database_1.connectToDatabase)();
            const result = await pool
                .request()
                .input("name", mssql_1.default.NVarChar, data.name)
                .input("price", mssql_1.default.Decimal(10, 2), data.price)
                .input("stock", mssql_1.default.Int, data.stock)
                .query(`INSERT INTO produtos (nome, preco, estoque)
                     OUTPUT INSERTED.id, INSERTED.nome AS name, INSERTED.preco AS price, INSERTED.estoque AS stock
                     VALUES (@name, @price, @stock)`);
            const product = result.recordset[0];
            if (!product) {
                throw new Error("O banco não retornou o produto criado.");
            }
            return product;
        }
        // Inserir nos dados mockados
        const newId = ProductRepository.products.length > 0
            ? Math.max(...ProductRepository.products.map((product) => product.id)) +
                1
            : 1;
        const newProduct = {
            id: newId,
            ...data,
        };
        ProductRepository.products.push(newProduct);
        return newProduct;
    }
    // Atualiza todos os campos; undefined significa que o ID não existe.
    async update(id, data) {
        if (!environment_1.useMock) {
            const pool = await (0, database_1.connectToDatabase)();
            const result = await pool
                .request()
                .input("id", mssql_1.default.Int, id)
                .input("name", mssql_1.default.NVarChar, data.name)
                .input("price", mssql_1.default.Decimal(10, 2), data.price)
                .input("stock", mssql_1.default.Int, data.stock)
                .query(`UPDATE produtos
           SET nome = @name, preco = @price, estoque = @stock
           OUTPUT INSERTED.id, INSERTED.nome AS name, INSERTED.preco AS price, INSERTED.estoque AS stock
           WHERE id = @id`);
            return result.recordset[0];
        }
        const productIndex = ProductRepository.products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            return undefined;
        }
        const updatedProduct = { id, ...data };
        ProductRepository.products[productIndex] = updatedProduct;
        return updatedProduct;
    }
    // Remove o produto e retorna true somente quando encontrou esse ID.
    async remove(id) {
        if (!environment_1.useMock) {
            const pool = await (0, database_1.connectToDatabase)();
            const result = await pool
                .request()
                .input("id", mssql_1.default.Int, id)
                .query("DELETE FROM produtos OUTPUT DELETED.id WHERE id = @id");
            return result.recordset.length > 0;
        }
        const productIndex = ProductRepository.products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            return false;
        }
        ProductRepository.products.splice(productIndex, 1);
        return true;
    }
}
exports.ProductRepository = ProductRepository;
// Dados temporários usados quando USE_MOCK=true.
ProductRepository.products = [
    { id: 1, name: "Teclado Mecânico", price: 350.0, stock: 15 },
    { id: 2, name: "Mouse Gamer", price: 150.0, stock: 30 },
    { id: 3, name: 'Monitor QHD 32"', price: 1800.0, stock: 5 },
];
//# sourceMappingURL=product.repository.js.map