'use strict';

require('dotenv').load();
const RPC = require('./rpc');
const Bitcoin = require('./bitcoin');
const { range } = require('./util');

const connectionParams =
{
    user: process.env.user,
    password: process.env.password,
    socket: process.env.socketBitcoind
}

const btc = new Bitcoin(connectionParams);

const getHeaderFile = async () =>
{
    try
    {
        const blockCount = await btc.getBlockCount();
        let finalRawData = '';

        for(const index of range(blockCount))
        {
            const hashBlock = await btc.getBlockHash(index);
            const rawHeader = await btc.getBlockHeader(hashBlock);
            finalRawData += rawHeader;
        }
        return finalRawData;
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports = getHeaderFile;