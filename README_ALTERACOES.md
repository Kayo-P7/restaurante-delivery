# Restaurante Delivery - Ajustes Necessários

## Problema identificado

O projeto atualmente **não possui conexão real com banco de dados**.

Os dados estão sendo armazenados apenas no navegador usando:

```javascript
localStorage
```

Isso significa que:

- pedidos
- reservas
- clientes
- carrinho

não ficam salvos em um servidor ou banco MySQL/PostgreSQL.

---

# O que foi identificado

## 1. Falta de backend

O projeto possui apenas:

- HTML
- CSS
- JavaScript

Mas não possui:

- Node.js
- Express
- PHP
- Django
- Spring Boot
- API REST

Sem backend não existe conexão real com banco de dados.

---

## 2. Uso de localStorage

Trechos como:

```javascript
localStorage.setItem("brasaReservas", JSON.stringify(reservas));
```

mostram que os dados estão sendo salvos apenas localmente.

---

## 3. Banco incompleto

Existe um arquivo:

```bash
database/restaurante.sql
```

Porém ele não está totalmente compatível com os formulários do sistema.

---

# Solução recomendada

## Criar um backend

A solução mais simples seria:

- Front-end atual
- Backend Node.js + Express
- Banco MySQL

---

# Estrutura recomendada

```bash
restaurante-delivery/
│
├── frontend/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── database/
│   └── package.json
│
└── database/
    └── restaurante.sql
```

---

# Exemplo de conexão MySQL

## Instalar dependências

```bash
npm init -y
npm install express mysql2 cors
```

---

## server.js

```javascript
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "restaurante_delivery"
});

db.connect((err) => {
    if(err){
        console.log("Erro ao conectar:", err);
    } else {
        console.log("MySQL conectado");
    }
});

app.post("/reservas", (req, res) => {

    const {
        nome,
        telefone,
        data,
        horario,
        pessoas,
        ocasiao,
        obs
    } = req.body;

    const sql = `
        INSERT INTO reservas
        (nome, telefone, data_reserva, horario, quantidade_pessoas, ocasiao, obs)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [nome, telefone, data, horario, pessoas, ocasiao, obs],
        (err, result) => {

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                mensagem: "Reserva salva com sucesso"
            });
        }
    );
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
```

---

# Alteração necessária no Front-end

## Antes

```javascript
localStorage.setItem("brasaReservas", JSON.stringify(reservas));
```

---

## Depois

```javascript
fetch("http://localhost:3000/reservas", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(reserva)
});
```

---

# Banco de dados sugerido

## restaurante.sql

```sql
CREATE DATABASE restaurante_delivery;

USE restaurante_delivery;

CREATE TABLE clientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    nascimento DATE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reservas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    data_reserva DATE NOT NULL,
    horario TIME NOT NULL,
    quantidade_pessoas INT NOT NULL,
    ocasiao VARCHAR(100),
    obs TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pedidos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    pagamento VARCHAR(50) NOT NULL,
    itens TEXT NOT NULL,
    total VARCHAR(30) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# Resultado esperado

Após as alterações:

- reservas serão salvas no MySQL
- pedidos serão persistidos
- dados não serão perdidos ao fechar navegador
- sistema ficará mais profissional
- possível integrar login/autenticação futuramente

---

# Tecnologias recomendadas

## Mais fácil para começar

- Node.js
- Express
- MySQL

---

# Observação final

O projeto atualmente funciona apenas como um front-end demonstrativo.

Para funcionar como um sistema real de delivery, é necessário:

- backend
- API
- conexão com banco
- persistência de dados
