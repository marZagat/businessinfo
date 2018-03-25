const express = require('express');

const router = express.Router();

router.use('/:id', express.static('client/dist'));

module.exports = router;
