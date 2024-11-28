const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Criação do servidor
const app = express();
const port = 3000;

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'quizdb'
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados');
});

// Middleware para permitir o uso de JSON no corpo das requisições
app.use(bodyParser.json());

// Rota para enviar o resultado do quiz
app.post('/submit', (req, res) => {
  const { nome, acertos } = req.body;

  // Inserir o resultado no banco de dados
  const query = 'INSERT INTO rankings (nome, acertos) VALUES (?, ?)';
  db.query(query, [nome, acertos], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Resultado salvo com sucesso!' });
  });
});

// Rota para buscar o ranking
app.get('/ranking', (req, res) => {
  const query = 'SELECT * FROM rankings ORDER BY acertos DESC LIMIT 10';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});