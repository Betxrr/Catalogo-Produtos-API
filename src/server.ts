import { createApp } from './app/app';

const app = createApp();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});