// Expose the metrics (make them available) by using a route and minimal logic
const express = require('express')
const router = express()

const {client} = require('../metrics.js')

router.get('/', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

module.exports = router;
