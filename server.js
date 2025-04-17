const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;
const FILE_PATH = path.join(__dirname, 'tasks.json');

app.use(cors());
app.use(bodyParser.json());

// Получить список задач
app.get('/tasks', (req, res) => {
  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Не удалось прочитать файл' });
    res.json(JSON.parse(data || '[]'));
  });
});

// Сохранить список задач
app.post('/tasks', (req, res) => {
  fs.writeFile(FILE_PATH, JSON.stringify(req.body, null, 2), err => {
    if (err) return res.status(500).json({ error: 'Не удалось сохранить файл' });
    res.json({ status: 'ok' });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});
