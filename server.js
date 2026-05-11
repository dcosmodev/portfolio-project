const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

// BANCO SQLITE
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Banco SQLite conectado 🚀");
  }
});

// CRIAR TABELA
db.run(`
  CREATE TABLE IF NOT EXISTS contatos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    mensagem TEXT
  )
`);

// CONFIG EMAIL OUTLOOK
const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: "davidbmx98765@gmail.com",
    pass: "pkdg uoxf xcqw xglt",
  },
});

// ROTA POST
app.post("/contato", (req, res) => {

  const { nome, email, mensagem } = req.body;

  const sql = `
    INSERT INTO contatos (nome, email, mensagem)
    VALUES (?, ?, ?)
  `;

  db.run(sql, [nome, email, mensagem], async function (err) {

    if (err) {

      console.log(err.message);

      return res.status(500).json({
        message: "Erro ao salvar",
      });
    }

    try {

      // ENVIO EMAIL
      await transporter.sendMail({

        from: "davidbmx98765@gmail.com",

        to: "davidbmx98765@gmail.com",

        subject: "Novo contato do Portfólio 🚀",

        html: `
          <h2>Novo contato recebido</h2>

          <p><strong>Nome:</strong> ${nome}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Mensagem:</strong> ${mensagem}</p>
        `,
      });

      res.json({
        message: "Mensagem salva e email enviado!",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Erro ao enviar email",
      });
    }
  });
});

// ROTA GET
app.get("/contatos", (req, res) => {

  db.all("SELECT * FROM contatos", [], (err, rows) => {

    if (err) {

      return res.status(500).json({
        message: "Erro ao buscar contatos",
      });
    }

    res.setHeader("Content-Type", "application/json");

    res.send(JSON.stringify(rows, null, 2));
  });
});

// SERVIDOR
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});