# Brasa & Arte - Restaurante Delivery

Projeto de site para restaurante com páginas de Início, Cardápio, Delivery, Reservas e Cadastro.

## O que foi ajustado

Agora o projeto possui conexão com banco de dados usando:

- Front-end: HTML, CSS, JavaScript e jQuery
- Backend: Node.js + Express
- Banco de dados: MySQL

Antes, os dados ficavam apenas no `localStorage` do navegador. Agora cadastro de clientes, reservas e pedidos são enviados para a API e salvos no MySQL.

## Estrutura importante

```text
backend/
├── server.js
├── db.js
├── package.json
├── .env.example
└── README.md

database/
└── restaurante.sql

assets/js/
├── api.js
├── cadastro.js
├── delivery.js
└── reservas.js
```

## Como rodar o projeto

### 1. Criar o banco de dados

Na pasta principal do projeto, rode:

```bash
mysql -u root -p < database/restaurante.sql
```

### 2. Configurar o backend

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env`:

```bash
cp .env.example .env
```

Abra o `.env` e coloque sua senha do MySQL:

```text
DB_PASSWORD=sua_senha_aqui
```

### 3. Ligar o servidor

Dentro da pasta `backend`, rode:

```bash
npm start
```

Se der certo, vai aparecer:

```text
Servidor rodando em http://localhost:3000
```

### 4. Abrir o site

Com o servidor ligado, abra o arquivo `index.html` no navegador.

## Observação

O site precisa do backend rodando para salvar no banco. Se o servidor estiver desligado, cadastro, reserva e pedido vão mostrar erro de conexão.
