const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeSite(city, date) {
    const url = `https://allevents.in/${city}/${date}`;

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const results = [];

        $('ul.event-card-parent.include-events-by-dates-section li.event-card.event-card-link').each((i, elem) => {
            const dataLink = $(elem).attr('data-link');
            if (dataLink) {
                results.push({ link: dataLink }); 
            }
        });

        const eventDetailsPromises = results.map(async ({ link }) => {
            const eventDetails = await scrapeEventDetails(link);
            return eventDetails; 
        });

        const eventDetails = await Promise.all(eventDetailsPromises);

        return { events: eventDetails.filter(event => event !== null) }; 
    } catch (err) {
        console.error('Error scraping site:', err.message);
        return { events: [] };
    }
}

async function scrapeEventDetails(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const title = $('title').text().split(' - ')[0].trim();  
        const imgSrc = $('div.event-description img').attr('src') || '';
        const description = $('div.event-description-html').text().trim();
        const dateTime = $('div.wdiv.datetime.hidden-phone').text().trim(); // TODO: get date time from span
        const location = $('.location-box .full-venue').text().trim() || '';

        return { title, imgSrc, description, dateTime, location };
    } catch (err) {
        console.error(`Error scraping event details from ${url}:`, err.message);
        return null;
    }
}

// scrapeSite('charlottesville', '2025-03-02').then(result => {
//     console.log(JSON.stringify(result, null, 2)); 
// }).catch(err => console.log(err));

module.exports = { scrapeSite, scrapeEventDetails };
