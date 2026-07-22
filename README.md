# Catálogo de Produtos API

## Objetivo

Projeto Fullstack em desenvolvimento, projetado para gerenciar um catálogo de produtos. O foco principal é a criação de um backend leve e de alto controle utilizando Express.js com TypeScript, integrado a um frontend dinâmico construído em Angular. 

A arquitetura busca priorizar a clareza nas regras de negócio, facilidade de manutenção e rotas REST bem definidas.

## Tecnologias Principais

- Node.js & Express: Framework minimalista para criação do servidor HTTP e rotas da API.
- TypeScript: Tipagem estática para garantir a consistência e segurança na manipulação dos dados.
- Angular: Framework corporativo para a criação da interface do usuário no frontend.
- tsx: Executor de TypeScript em ambiente de desenvolvimento com suporte a recarregamento automático.
- CORS: Middleware para gerenciamento e liberação de acessos do frontend à API.

## Planejamento (Roadmap)

### Fase 1: Backend e Estrutura de Rotas (Express)
- [ ] Configuração inicial do projeto com Node.js, TypeScript e Express.
- [ ] Definição da interface de dados do produto (ID, Nome, Preço, Descrição, Categoria).
- [ ] Implementação da estrutura em memória para armazenamento temporário.
- [ ] Criação das rotas REST de consulta (`GET /produtos`, `GET /produtos/:id`).
- [ ] Criação das rotas REST de cadastro e exclusão (`POST /produtos`, `DELETE /produtos/:id`).
- [ ] Implementação do método de atualização de produtos (`PUT /produtos/:id`).

### Fase 2: Testes e Validações
- [x] Validação manual de requisições HTTP via Postman.
- [ ] Tratamento centralizado de erros e mensagens de resposta HTTP adequadas.

### Fase 3: Frontend (Angular)
- [ ] Inicialização do projeto Angular via Angular CLI.
- [ ] Criação dos componentes de listagem e formulário de produtos.
- [ ] Implementação de Service para consumo da API Express via HttpClient.
- [ ] Integração completa entre frontend e backend na tela.

## Como Rodar o Projeto Localmente

Siga as instruções abaixo para executar o servidor em sua máquina local.

### Pré-requisitos
- Node.js instalado (versão 18.x ou superior).
- Gerenciador de pacotes npm ativo.

### Instalação e Execução

1. Clone o repositório para sua máquina:
   ```bash
   git clone [https://github.com/SEU_USUARIO/api-produtos.git](https://github.com/SEU_USUARIO/api-produtos.git)
   cd api-produtos
