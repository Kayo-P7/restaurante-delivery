# Brasa & Arte — Restaurante Delivery

Sistema completo de restaurante com delivery, reservas e cadastro de clientes.

## Stack

- **Frontend**: HTML, CSS, JavaScript (jQuery)
- **Backend**: PHP 7.4+ com MySQLi
- **Banco**: MySQL / MariaDB

## Estrutura de arquivos

```
restaurante-delivery/
├── backend/
│   ├── config.php          ← Configurações do banco (editar aqui)
│   ├── .htaccess           ← Roteamento da API
│   └── api/
│       ├── clientes.php    ← GET / POST / DELETE clientes
│       ├── login.php       ← POST login
│       ├── reservas.php    ← GET / POST / DELETE reservas
│       └── pedidos.php     ← GET / POST / DELETE pedidos
├── assets/
│   ├── css/                ← Estilos do projeto
│   └── js/
│       ├── api.js          ← Funções HTTP (aponta para PHP)
│       ├── cadastro.js     ← Login, cadastro, excluir conta
│       ├── delivery.js     ← Carrinho, pedidos, excluir pedido
│       ├── reservas.js     ← Reservas, excluir reserva
│       └── ...
├── database/
│   └── restaurante.sql     ← Script de criação do banco
├── index.html
├── cadastro.html
├── cardapio.html
├── delivery.html
└── reservas.html
```

## Como rodar

### 1. Banco de dados
```sql
-- Execute no MySQL/MariaDB:
source database/restaurante.sql
```

### 2. Configuração PHP
Edite `backend/config_exemplo.php` com seus dados:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', 'sua_senha');
define('DB_NAME', 'restaurante_delivery');
```

### 3. Servidor
Coloque a pasta num servidor Apache/PHP (XAMPP, WAMP, Laragon).  
Acesse `http://localhost/restaurante-delivery/`.

Se o mod_rewrite não estiver ativo, acesse a API diretamente por `/backend/api/pedidos.php`.

## Funcionalidades

| Recurso | Descrição |
|---|---|
| Cadastro de clientes | Formulário com validação e hash de senha |
| Login / Logout | Sessão via `sessionStorage` |
| Esconder cadastro após login | Formulários somem; exibe painel do usuário |
| Excluir própria conta | Botão no painel do usuário logado |
| Delivery / Carrinho | Adiciona itens, calcula total, finaliza pedido |
| Excluir pedidos | Botão por pedido na lista de pedidos |
| Reservas de mesa | Formulário completo com lista |
| Excluir reservas | Botão por reserva na lista |

## Endpoints PHP

| Método | URL | Descrição |
|---|---|---|
| POST | `/backend/api/clientes.php` | Criar cliente |
| GET  | `/backend/api/clientes.php` | Listar clientes |
| DELETE | `/backend/api/clientes.php?id=X` | Excluir cliente |
| POST | `/backend/api/login.php` | Login |
| POST | `/backend/api/reservas.php` | Criar reserva |
| GET  | `/backend/api/reservas.php` | Listar reservas |
| DELETE | `/backend/api/reservas.php?id=X` | Excluir reserva |
| POST | `/backend/api/pedidos.php` | Criar pedido |
| GET  | `/backend/api/pedidos.php` | Listar pedidos |
| DELETE | `/backend/api/pedidos.php?id=X` | Excluir pedido |
