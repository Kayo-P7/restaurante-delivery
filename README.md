# Brasa & Arte — Restaurante Delivery

Sistema web completo para restaurante com funcionalidades de delivery, reservas de mesa, autenticação de usuários e gerenciamento de pedidos.

O projeto utiliza uma arquitetura simples e leve baseada em PHP + MySQL no backend e HTML, CSS, JavaScript, jQuery e Alpine.js no frontend.

---

# Tecnologias Utilizadas

## Frontend

* HTML5
* CSS3
* JavaScript
* jQuery
* Alpine.js

## Backend

* PHP
* MySQL

## Banco de Dados

* MySQL

---

# Estrutura do Projeto

```bash
restaurante-delivery/
│
├── backend/
│   ├── config.php
│   ├── config_exemplo.php
│   ├── .htaccess
│   └── api/
│       ├── clientes.php
│       ├── login.php
│       ├── reservas.php
│       └── pedidos.php
│
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   ├── forms.css
│   │   ├── delivery.css
│   │   └── ...
│   │
│   └── js/
│       ├── api.js
│       ├── cadastro.js
│       ├── delivery.js
│       ├── reservas.js
│       ├── navegacao.js
│       ├── utils.js
│       └── ...
│
├── database/
│   └── restaurante.sql
│
├── index.html
├── cadastro.html
├── cardapio.html
├── delivery.html
└── reservas.html
```

---

# Instalação e Configuração

# 1. Configurar o banco de dados

Crie um banco chamado:

```sql
restaurante_delivery
```

Depois execute o script:

```sql
source database/restaurante.sql
```

Você também pode importar o arquivo `.sql` pelo phpMyAdmin ou MySQL Workbench.

---

## 2. Configurar conexão PHP

Edite o arquivo:

```bash
backend/config_exemplo.php e renomeie para "config.php"
```

Exemplo:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'restaurante_delivery');
```

---

# Executando o Projeto

## Requisitos

* Apache
* PHP 7.4+
* MySQL/MariaDB

Recomendado utilizar:

* XAMPP
* Laragon
* WAMP

---

## Rodando localmente

Coloque a pasta do projeto dentro do diretório do servidor.

Exemplo no XAMPP:

```bash
htdocs/restaurante-delivery
```

Depois acesse:

```bash
http://localhost/restaurante-delivery/
```

---

# Funcionalidades

# Sistema de Clientes

* Cadastro de usuários
* Login e logout
* Persistência de sessão via `sessionStorage`
* Exclusão da própria conta

---

# Delivery

* Carrinho de compras
* Adição de produtos
* Cálculo automático de total
* Finalização de pedidos
* Exclusão de pedidos

---

# Reservas

* Cadastro de reservas de mesa
* Listagem de reservas
* Exclusão de reservas

---

# Interface Reativa

O projeto foi refatorado utilizando Alpine.js para controle de estados visuais:

* Exibição dinâmica de formulários
* Controle de login/logout
* Mensagens de sucesso
* Carrinho vazio/cheio
* Alternância de telas sem manipulação manual excessiva de DOM

---

# Endpoints da API

| Método | Endpoint                         | Descrição       |
| ------ | -------------------------------- | --------------- |
| POST   | `/backend/api/clientes.php`      | Criar cliente   |
| GET    | `/backend/api/clientes.php`      | Listar clientes |
| DELETE | `/backend/api/clientes.php?id=X` | Excluir cliente |
| POST   | `/backend/api/login.php`         | Realizar login  |
| POST   | `/backend/api/reservas.php`      | Criar reserva   |
| GET    | `/backend/api/reservas.php`      | Listar reservas |
| DELETE | `/backend/api/reservas.php?id=X` | Excluir reserva |
| POST   | `/backend/api/pedidos.php`       | Criar pedido    |
| GET    | `/backend/api/pedidos.php`       | Listar pedidos  |
| DELETE | `/backend/api/pedidos.php?id=X`  | Excluir pedido  |


Projeto desenvolvido para fins acadêmicos e educacionais.
