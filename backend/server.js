const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/status", (req, res) => {
  res.json({ mensagem: "API funcionando" });
});

app.post("/api/clientes", async (req, res) => {
  try {
    const { nome, telefone, email, nascimento, senha } = req.body;

    if (!nome || !telefone || !email || !senha) {
      return res.status(400).json({ erro: "Nome, telefone, e-mail e senha são obrigatórios." });
    }

    await db.query(
      "INSERT INTO clientes (nome, telefone, email, nascimento, senha) VALUES (?, ?, ?, ?, ?)",
      [nome, telefone, email, nascimento || null, senha]
    );

    res.status(201).json({ mensagem: "Cliente cadastrado com sucesso." });
  } catch (erro) {
    if (erro.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ erro: "Este e-mail já está cadastrado." });
    }

    console.error(erro);
    res.status(500).json({ erro: "Erro ao cadastrar cliente." });
  }
});

app.get("/api/clientes", async (req, res) => {
  try {
    const [clientes] = await db.query(
      "SELECT id, nome, telefone, email, nascimento, criado_em FROM clientes ORDER BY id DESC"
    );

    res.json(clientes);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao listar clientes." });
  }
});

app.post("/api/reservas", async (req, res) => {
  try {
    const { nome, telefone, data_reserva, horario, quantidade_pessoas, ocasiao, obs } = req.body;

    if (!nome || !telefone || !data_reserva || !horario || !quantidade_pessoas) {
      return res.status(400).json({ erro: "Preencha todos os campos obrigatórios da reserva." });
    }

    await db.query(
      `INSERT INTO reservas
       (nome, telefone, data_reserva, horario, quantidade_pessoas, ocasiao, obs)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nome, telefone, data_reserva, horario, quantidade_pessoas, ocasiao || null, obs || null]
    );

    res.status(201).json({ mensagem: "Reserva salva com sucesso." });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao salvar reserva." });
  }
});

app.get("/api/reservas", async (req, res) => {
  try {
    const [reservas] = await db.query("SELECT * FROM reservas ORDER BY id DESC");
    res.json(reservas);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao listar reservas." });
  }
});

app.post("/api/pedidos", async (req, res) => {
  try {
    const { nome, telefone, endereco, pagamento, itens, total } = req.body;

    if (!nome || !telefone || !endereco || !pagamento || !itens || !total) {
      return res.status(400).json({ erro: "Preencha todos os campos do pedido." });
    }

    await db.query(
      `INSERT INTO pedidos
       (nome, telefone, endereco, pagamento, itens, total)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nome, telefone, endereco, pagamento, itens, total]
    );

    res.status(201).json({ mensagem: "Pedido salvo com sucesso." });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao salvar pedido." });
  }
});

app.get("/api/pedidos", async (req, res) => {
  try {
    const [pedidos] = await db.query("SELECT * FROM pedidos ORDER BY id DESC");
    res.json(pedidos);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao listar pedidos." });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
