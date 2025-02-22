const express = require('express');
const cors = require('cors');
const path = require('path');
const { scrapeSite } = require('./webScraper.js');

const app = express();
const port = 3000; 

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../build')));

app.get('/test', (req, res) => {
  res.send('Backend is working');
});

app.get('/scrapeSite', async (req, res) => {
  const { city, date } = req.query;
  try {
    const events = await scrapeSite(city, date);
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to scrape events' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

