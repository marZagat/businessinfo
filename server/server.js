const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3003;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`)
});


// OLD SERVER PREVIOUSLY CALLED INDEX.JS
// // require('newrelic');
// const express = require('express');

// const app = express();

// const path = require('path');
// const cors = require('cors');
// // var morgan = require('morgan');
// const restaurantsRouter = require('./routers/restaurants.js');
// const restaurantsApiRouter = require('./routers/restaurants_api.js');

// app.use(cors());

// // app.use(morgan('tiny'));

// app.get('/bundle.js', (req, res) => {
//   res.sendFile(path.resolve('client/dist/bundle.js'));
// });

// app.use('/restaurants', restaurantsRouter);

// app.use('/api/restaurants', restaurantsApiRouter);

// var port = process.env.PORT || 3003;
// app.listen(port, () => { console.log('Listening on http://localhost:' + port); });
