# Business Info 
## Credits
This repository is based on a pre-existing front-end capstone project. Credit due to Paolo: 
Source Repository: https://github.com/bamboo-connection/map-side-bar 
Owner: https://github.com/leetster0

## Purpose
This service forms a part of the marZagat food review website. It renders basic information about a restaurant, including the opening hours, address, phone number, and links to website and to google maps for directions. In addition, the service renders a map centered on the location of the restaurant, with a labeled marker.

## Description
The service is composed of a server, a client, and a database.
### Server API
- The microservice renders in isolation with a request to the host at path /restaurants/:id with an example restaurant id.
- Serves static client files in response to a GET request to the /restaurants/:id path
- It also serves json formatted restaurant data in response to a GET request to the /api/restaurants/:id/sidebar endpoint.
### Database
A MongoDB database that holds restaurant information.
### Client
Takes in a restaurant ID and requests restaurant information from the server. Renders the information.

## Getting Started
### Prerequisites
- npm
- node
- jest
- webpack
- MongoDB
- Google Maps API key set to MAP_KEY in .env file

### Manual Installation 
1. Install dependencies: `npm install`
2. Build client files: `npm run build`
3. Start database server: `npm run database`
4. Seed database: `npm run seed`
5. Start server: `npm start`

### Docker Installation
1. Spin up containers: `docker-compose up`
2. Seed database: `docker exec -it <businessinfo container name> npm run seed`

To start, in your browser navigate to: [http://localhost:3003](http://localhost:3003)

## Tests
Run: `npm test`
