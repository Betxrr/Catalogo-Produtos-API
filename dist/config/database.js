"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
const node_path_1 = __importDefault(require("node:path"));
const mssql_1 = __importDefault(require("mssql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: node_path_1.default.resolve(__dirname, '../../../.env') });
const dbConfig = {
    server: process.env.DB_SERVER || 'localhost',
    options: {
        instanceName: process.env.DB_INSTANCE || 'SQLEXPRESS01',
        database: process.env.DB_DATABASE || 'MiniWMS',
        encrypt: false,
        trustServerCertificate: true,
        trustedConnection: true,
    },
    port: Number(process.env.DB_PORT || 1433),
};
let pool = null;
async function connectToDatabase() {
    try {
        if (pool) {
            return pool;
        }
        pool = await mssql_1.default.connect(dbConfig);
        console.log('✅ Conexão com o SQL Server estabelecida com sucesso usando Autenticação do Windows!');
        return pool;
    }
    catch (error) {
        console.error('❌ Erro ao conectar no SQL Server:', error);
        throw error;
    }
}
//# sourceMappingURL=database.js.map