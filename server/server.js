require('newrelic');
const express = require('express');
// const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const businessInfoHost = process.env.BUSINESS_INFO_HOST || 'localhost';

const app = express();
const port = process.env.PORT || 3003;

const restaurantsRouter = require('./routers/restaurants.js');
const restaurantsApiRouter = require('./routers/restaurants_api.js');

// app.use(morgan('dev'));
app.use(cors());

app.use(express.static(path.join(__dirname, '../public/')));

app.get('/app.js', (req, res) => {
  res.sendFile(path.resolve('./public/app.js'));
});

app.use('/restaurants', restaurantsRouter);

app.use('/api/restaurants', restaurantsApiRouter);

app.listen(port, () => {
  console.log(`Business Info microservice server running at: http://${businessInfoHost}:${port}`);
});
