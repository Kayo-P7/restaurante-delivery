# Backend do Brasa & Arte

Esse backend conecta o site ao MySQL.

## Como rodar

1. Crie o banco usando o arquivo:

```bash
mysql -u root -p < ../database/restaurante.sql
```

2. Entre na pasta do backend:

```bash
cd backend
```

3. Instale as dependências:

```bash
npm install
```

4. Crie o arquivo `.env` copiando o exemplo:

```bash
cp .env.example .env
```

5. Edite o `.env` e coloque sua senha do MySQL.

6. Inicie o servidor:

```bash
npm start
```

A API vai rodar em:

```text
http://localhost:3000/api
```

Depois disso, abra o `index.html` normalmente no navegador.
