const express = require('express');
const cors = require('cors');
const { loadCarData } = require('./services/car_api_xml.js');

const app = express();
const port = 3000;

app.use(cors());

app.get('/carros', (req, res) => {
  loadCarData((err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao carregar dados' });
    }
    res.json(data);
  });
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
