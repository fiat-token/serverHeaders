'use strict';

require('dotenv').load();
const express = require('express')
const bodyParser = require('body-parser');
const routes = require('./src/routes.js');

const port = process.env.port || 5000;
const socketOrigin = process.env.webServer || "127.0.0.1";

const app = express();
app.use('/', routes);
app.use(bodyParser.json({limit: '50gb'}));
app.use(bodyParser.urlencoded({limit: '50gb', extended: true}));
app.listen(port, socketOrigin, () => console.log('Server running at ' + socketOrigin + ':' + port)) //socketOrigin,