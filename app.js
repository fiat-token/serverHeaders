'use strict';

require('dotenv').load();
const http = require('http');
const fs = require('fs');
const url = require('url');
const getHeaderFile = require('./createHeader');



const app = async (req, res) => 
{
    if (url.parse(req.url, true).pathname != '/blockchain_headers') return;

    const file = "blockchain_headers";
    const socketDest =  req.client.remoteAddress + ":" + req.client.remotePort;

    console.log("API download: request from: " + socketDest + " for " + file);

    res.setHeader('Content-type', 'text/plain' );
    const data = await getHeaderFile();
    res.end(data);
    console.log("API download success: " + socketDest + " downloaded " + file);
}

try
{

}
catch(err)
{

}
const port = process.env.port || 5000;
http.createServer(app).listen(port);
console.log('Server running at http://127.0.0.1:' + port);