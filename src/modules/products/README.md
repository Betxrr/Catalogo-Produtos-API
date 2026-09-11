# Módulo de Produtos

## O que esse módulo faz

Este módulo é responsável por gerenciar o catálogo de produtos da aplicação. Ele cuida da listagem de produtos e do cadastro de novos itens no sistema.

Em outras palavras, ele controla tudo que está relacionado a produtos: estrutura, regras de negócio, acesso aos dados e rotas HTTP.

## Rotas disponíveis

### GET /products

Lista todos os produtos cadastrados.

- Método: GET
- URL: /products
- Corpo da requisição: não é necessário
- Resposta esperada: array com os produtos

Exemplo de retorno:

```json
[
  {
    "id": 1,
    "name": "Teclado Mecânico",
    "price": 350,
    "stock": 15
  }
]
```

### POST /products

Cria um novo produto.

- Método: POST
- URL: /products
- Corpo da requisição: obrigatório

Payload esperado:

```json
{
  "name": "Caneta Azul",
  "price": 12,
  "stock": 50
}
```

Resposta esperada:

```json
{
  "id": 4,
  "name": "Caneta Azul",
  "price": 12,
  "stock": 50
}
```

## Regras de negócio

As regras atuais do domínio são:

- o nome do produto é obrigatório;
- o preço deve ser maior que zero;
- o estoque deve ser um número inteiro;
- o estoque não pode ser negativo;
- o ID do produto é gerado automaticamente;
- o nome é limpo antes de ser salvo, removendo espaços extras.

## Estrutura interna

Este módulo é dividido em quatro partes:

- `product.model.ts` → define a estrutura do produto;
- `product.repository.ts` → acessa e guarda os dados em memória;
- `product.service.ts` → aplica as regras e validações;
- `product.controller.ts` → trata a requisição HTTP e devolve a resposta;
- `product.routes.ts` → registra as rotas do módulo.

## Observações importantes

Atualmente os dados são mantidos em memória, em um array estático dentro do repositório. Isso é ótimo para aprender a arquitetura do backend e testar o fluxo da API sem depender de banco de dados.

No futuro, esse repositório pode ser trocado por uma implementação com SQL Server, mantendo o restante do módulo praticamente igual.
