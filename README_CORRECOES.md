# Restaurante Delivery - Correções Realizadas

## Problemas encontrados

O sistema apresentava erro ao tentar salvar reservas:

```text
Erro ao salvar reserva: Failed to fetch
```

E no backend aparecia:

```text
Access denied for user 'root'@'localhost' (using password: NO)
```

## O que estava causando o erro

### 1. Backend não estava lendo o arquivo `.env`

O projeto possuía apenas:

```text
.env.example
```

Mas o Node.js procura automaticamente por:

```text
.env
```

Por isso o backend tentava conectar no MySQL sem senha.

---

### 2. Banco de dados incompleto/desatualizado

Algumas tabelas estavam sem colunas necessárias, causando erros na integração entre frontend e backend.

Exemplo:

```text
Duplicate column name 'endereco'
```

Isso mostrou que parte do banco já havia sido criada anteriormente.

---

## Correções realizadas

### Integração com banco de dados

- Configuração do MySQL revisada
- Arquivo `.env` configurado corretamente
- Banco `restaurante_delivery` criado
- Scripts SQL executados

### Backend

- Dependências instaladas com `npm install`
- Servidor Node.js iniciado corretamente
- Conexão do Express com MySQL corrigida

### Reservas

- Correção do envio de reservas
- Correção do erro `Failed to fetch`
- Ajustes na comunicação frontend/backend

---

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- Node.js
- Express
- MySQL

---

## Como executar o projeto

### Instalar dependências

```bash
npm install
```

### Configurar `.env`

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=restaurante_delivery
```

### Executar servidor

```bash
node server.js
```

---

## Commit recomendado

```bash
git commit -m "fix: corrige integração do backend com MySQL e sistema de reservas"
```
