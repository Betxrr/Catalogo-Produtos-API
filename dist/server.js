"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const database_1 = require("./config/database");
async function bootstrap() {
    try {
        // Valida a conexão com o banco antes de liberar o servidor
        await (0, database_1.connectToDatabase)();
        console.log('🚀 Servidor rodando e pronto para operar com o MiniWMS.');
    }
    catch (error) {
        console.error('Falha ao subir a aplicação devido a erros no banco de dados.');
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=server.js.map