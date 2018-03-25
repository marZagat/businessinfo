const express = require('express');

const router = express.Router();
const getRestaurantById = require('../../mongodb/controllers/getRestaurantById.js');

router.get('/:id/businessinfo', (req, res) => {
  const restaurantId = req.params.id;
  getRestaurantById(restaurantId).then((result) => {
    res.send(result);
  });
});

module.exports = router;
