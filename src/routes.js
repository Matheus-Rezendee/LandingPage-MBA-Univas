const express = require('express');
const router = express.Router();
const db = require('./database');

// Rota POST /inscricao
router.post('/', (req, res) => {
  const { nome, email, telefone, cargo, formacao, faixa_salarial } = req.body;

  if (!nome || !email || !telefone || !cargo || !formacao || !faixa_salarial) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
  }

  const sql = `
    INSERT INTO inscricoes (nome, email, telefone, cargo, formacao, faixa_salarial)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [nome, email, telefone, cargo, formacao, faixa_salarial], function (err) {
    if (err) {
      console.error("Erro ao inserir dados:", err.message);
      return res.status(500).json({ mensagem: "Erro ao salvar a inscrição." });
    }

    res.status(201).json({ mensagem: "Inscrição realizada com sucesso!", id: this.lastID });
  });
});

// Rota GET /inscricoes - retorna todas as inscrições
router.get('/todas', (req, res) => {
  db.all('SELECT * FROM inscricoes', [], (err, rows) => {
    if (err) {
      console.error("Erro ao buscar inscrições:", err.message);
      return res.status(500).json({ mensagem: "Erro ao buscar inscrições." });
    }

    res.status(200).json(rows);
  });
});

// Rota GET /inscricao/:id - retorna uma inscrição específica
router.get('/:id', (req, res) => {
  const id = req.params.id;

  db.get('SELECT * FROM inscricoes WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error("Erro ao buscar inscrição:", err.message);
      return res.status(500).json({ mensagem: "Erro ao buscar inscrição." });
    }

    if (!row) {
      return res.status(404).json({ mensagem: "Inscrição não encontrada." });
    }

    res.status(200).json(row);
  });
});

module.exports = router;
