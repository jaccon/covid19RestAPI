const express = require('express');

const DataStreamer = require('./controllers/DataStreamer');

const routes = express.Router();
routes.post('/covid19/data/update', DataStreamer.update);
routes.get('/covid19/data', DataStreamer.index);
routes.get('/covid19/data/brazil', DataStreamer.indexBr);

module.exports = routes;