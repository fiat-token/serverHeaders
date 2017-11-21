const express = require('express');
const router = express.Router();
require('dotenv').load();
const getHeaderFile = require('./createHeader');


const route = async (req, res) =>
{
    try
    {
        const socketDest =  req.client.remoteAddress + ":" + req.client.remotePort;
        console.log("API download: request from: " + socketDest);
        res.send( await getHeaderFile() );
        console.log("API download success: " + socketDest);
    }
    catch(err)
    {
        console.log(err);  
        res.status(500);
        res.send(err);
    }
}

router.get('/blockchain_headers', route);

module.exports = router;