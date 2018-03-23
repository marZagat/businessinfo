var express = require('express');
var router = express.Router();
var getRestaurantById = require('../../mongodb/controllers/getRestaurantById.js');

router.get('/:id/businessinfo', (req, res) => {
  var restaurantId = req.params.id;
  getRestaurantById(restaurantId).then((result) => {
    res.send(result);
  });
});

module.exports = router;
