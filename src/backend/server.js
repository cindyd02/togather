const express = require('express');
const cors = require('cors');
const { scrapeSite } = require('./webScraper.js');
const app = express();

app.use(cors());  
app.use(express.json());

const port = process.env.PORT || 6000;

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
