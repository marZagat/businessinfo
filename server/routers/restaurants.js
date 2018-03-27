const express = require('express');

const router = express.Router();

router.use('/:id', express.static('public'));

module.exports = router;
