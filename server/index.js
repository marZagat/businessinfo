require('newrelic');
var express = require('express');
var app = express();

var path = require('path');
var cors = require('cors');
// var morgan = require('morgan');
var restaurantsRouter = require('./routers/restaurants.js');
var restaurantsApiRouter = require('./routers/restaurants_api.js');

app.use(cors());

// app.use(morgan('tiny'));

app.get('/bundle.js', (req, res) => {
  res.sendFile(path.resolve('client/dist/bundle.js'));
});

app.use('/restaurants', restaurantsRouter);

app.use('/api/restaurants', restaurantsApiRouter);



var port = process.env.PORT || 3003;
app.listen(port, () => { console.log('Listening on http://localhost:' + port); });
