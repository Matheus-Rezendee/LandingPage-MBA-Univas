const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./inscricoes.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS inscricoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    telefone TEXT,
    cargo TEXT,
    formacao TEXT,
    faixa_salarial TEXT
  )`);
});

module.exports = db;