const express = require('express');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const app = express();
const server = http.Server(app);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);