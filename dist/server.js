"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app/app");
const app = (0, app_1.createApp)();
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
//# sourceMappingURL=server.js.map