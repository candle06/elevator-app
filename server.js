const express = require('express');
const fetch = require('node-fetch');
const { XMLParser } = require('fast-xml-parser');
const app = express();

const API_KEY = 'ea2ab2e03de6ca2713e678cfffbd09fd304648d6d0be836d68705dbb975ed24f'; // 발급받은 API 키 입력

app.use(express.static('public'));

app.get('/search', async (req, res) => {
  const keyword = req.query.q;
  const url = `http://apis.data.go.kr/1613000/ElevatorService/getElevatorInfo?serviceKey=${API_KEY}&keyword=${encodeURIComponent(keyword)}&numOfRows=10&pageNo=1`;

  try {
    const response = await fetch(url);
    const xml = await response.text();
    const parser = new XMLParser();
    const json = parser.parse(xml);

    const items = json.response?.body?.items?.item || [];
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
