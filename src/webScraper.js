const axios = require('axios');
const cheerio = require('cheerio');
const { text } = require('framer-motion/client');

async function scrapeSite(city, date) {
    const url = `https://allevents.in/${city}/${date}`;

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const results = [];

        $('ul.event-card-parent.include-events-by-dates-section li.event-card.event-card-link').each((i, elem) => {
            const dataLink = $(elem).attr('data-link');
            if (dataLink) {
                results.push(dataLink);
            }
        });

        for (const link of results) {
            const eventDetails = await scrapeEventDetails(link);
            if (eventDetails) {
                results.push(eventDetails);
            }
        }

        return results;
    } catch (err) {
        console.error('Error scraping site:', err.message);
        return [];
    }
}

async function scrapeEventDetails(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        let title = $('title').text().trim();  
        title = title.split(' - ')[0];      
        const imgSrc = $('div.event-description img').attr('src') || '';
        const description = $('div.event-description-html').text().trim();
        const dateTime = $('div.wdiv.datetime.hidden-phone').text();        
        // TODO: GET DATE TIME FROM SPAN INNER TEXT
        const location = $('.location-box .full-venue').text().trim() || '';

        return { title, imgSrc, description, dateTime, location };
    } catch (err) {
        console.error(`Error scraping event details from ${url}:`, err.message);
        return null;
    }
}

scrapeSite('charlottesville', '2025-03-02').then(result => {
    console.log(result);
}).catch(err => console.log(err));
