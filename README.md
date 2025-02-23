# toGather
An event discovery app that connects users with like-minded people to attend events together.

toGather was inspired by the challenge of meeting new people and finding great events, especially in a new city or when looking to expand your social circle. The app makes event discovery effortless by allowing users to swipe on events they’re interested in and automatically matching them with others who share the same interests. Group chats are instantly created to help users connect, plan, and attend events together—making every outing more memorable.

## Key Features
- 🎫 **Effortless Event Discovery**: Swipe left or right to browse events happening near you.
- 💬 **Instant Group Chats**: Get automatically added to group chats with others interested in the same events to coordinate plans seamlessly.
- 👥 **Profile Customization**: Update your location and set event preferences to find the best matches.
- 📲 **Notifications**: Receive alerts when a new group chat is created, so you never miss an opportunity to connect.

## Development

To run the backend:
- `cd backend`
- `npm install`
- `npm start`

Note: the frontend should be built first using `cd frontend` and `npm run build`.

To run the frontend:
- `cd frontend`
- `npm install`
- `npm run dev`

## Built With
- **React**: Frontend for a smooth, engaging UI with swiping functionality.
- **TailwindCSS**: For fast and flexible styling.
- **Vite**: Development and build tool for frontend.
- **Node.js + Express**: Backend API and web scraping functionality.
- **AWS S3**: For deployment.

## How It Works
1. **Event Browsing**: Users explore local events by swiping or clicking thumbs-up/thumbs-down buttons.
2. **Matching Algorithm**: Automatically matches users with others who are interested in attending the same event.
3. **Group Chats**: Instantly creates group chats for event coordination.
4. **Profile Interaction**: Click on group chat members to view their details and connect further.

## Challenges
- **Web Scraping**: Implemented a JavaScript function to scrape event data from allevents.in using Axios and Cheerio.
- **CORS Issues**: Successfully resolved CORS issues when connecting the Node.js backend to the React frontend using Express middleware.

## Accomplishments
- Built a robust matching algorithm to connect users with similar interests.
- Designed a smooth, intuitive UI for event browsing with swipe functionality.
- Implemented notification features to keep users engaged and informed.

## What's Next for toGather
- 🚀 **Enhanced Event Discovery**: Improve the web scraper to gather more events from diverse sources.
- 🎯 **Increased Personalization**: Allow users to specify event preferences and explore events in neighboring cities.
- 📨 **Expanded Messaging**: Introduce direct messaging and friending features for deeper social connections.

## Authors
- Cindy Dong
- Olivia Seto
- Rebecca Wu
- Edward Wei
