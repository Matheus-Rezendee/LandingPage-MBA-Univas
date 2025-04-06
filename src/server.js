const express = require('express');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/', routes);

// Rota principal (formulário)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Rota para visualizar as inscrições em HTML
app.get('/ver-inscricoes', (req, res) => {
  const sql = 'SELECT * FROM inscricoes';

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar inscrições:', err.message);
      return res.status(500).send('Erro ao buscar inscrições');
    }

    // Cria uma tabela HTML com os dados
    let html = `
      <html>
        <head>
          <title>Inscrições</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
            th { background-color: #f4f4f4; }
          </style>
        </head>
        <body>
          <h1>Lista de Inscrições</h1>
          <table>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Cargo</th>
              <th>Formação</th>
              <th>Faixa Salarial</th>
            </tr>`;

    rows.forEach(row => {
      html += `
        <tr>
          <td>${row.id}</td>
          <td>${row.nome}</td>
          <td>${row.email}</td>
          <td>${row.telefone}</td>
          <td>${row.cargo}</td>
          <td>${row.formacao}</td>
          <td>${row.faixa_salarial}</td>
        </tr>`;
    });

    html += `
          </table>
        </body>
      </html>`;

    res.send(html);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
