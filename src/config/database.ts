import path from 'node:path';
import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

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

export async function connectToDatabase(): Promise<sql.ConnectionPool> {
    try {
        if (pool) {
            return pool;
        }

        pool = await sql.connect(dbConfig);
        console.log('✅ Conexão com o SQL Server estabelecida com sucesso usando Autenticação do Windows!');

        return pool;
    } catch (error) {
        console.error('❌ Erro ao conectar no SQL Server:', error);
        throw error;
    }
}
