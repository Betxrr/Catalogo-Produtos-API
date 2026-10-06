import path from 'node:path';
import sql from 'mssql';
import './environment';

// Configuração do SQL Server.
const dbConfig: sql.config = {
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

let pool: sql.ConnectionPool | null = null;

// Cria e reutiliza a conexão com o banco.
export async function connectToDatabase(): Promise<sql.ConnectionPool> {
    try {
        if (pool) {
            return pool;
        }

        pool = await sql.connect(dbConfig);
        console.log('✅ Conexão com o SQL Server estabelecida com sucesso usando autenticação do Windows.');

        return pool;
    } catch (error) {
        console.error('❌ Erro ao conectar no SQL Server:', error);
        throw error;
    }
}
