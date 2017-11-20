'use strict';

require('dotenv').load();
const callRPC = require('./callRPC');

const connectionParams =
{
    user: process.env.user,
    password: process.env.password,
    socket: process.env.socketBitcoind
}

const client = new callRPC(connectionParams);

const getHeaderFile = async () =>
{
    try
    {
        if(process.env.user == undefined) throw new Error("no user has been given");
        if(process.env.password == undefined) throw new Error("no password has been given");
        if(process.env.socketBitcoind == undefined) throw new Error("no socketBitcoind has been given");
        
        const blockCount = await getBlockCount();
        let finalRawData = '';

        for(const index of range(blockCount))
        {
            const hashBlock = await getBlockHash(index);
            const rawHeader = await getBlockHeader(hashBlock);
            finalRawData += rawHeader;
        }

        return finalRawData;
    }
    catch(err)
    {
        console.log(err);
    }
}

const getBlockCount = async () =>
{
    const blockCount = await client.fetch('getblockcount');
    return blockCount;
}

const getBlockHash = async (indexBlock) =>
{
    const hashBlock = await client.fetch('getblockhash', [indexBlock]);
    return hashBlock;
}

const getBlockHeader = async (hashBlockHeader, raw=false) =>
{
    const rawHeader = await client.fetch('getblockheader', [hashBlockHeader, raw]);
    return rawHeader;
}

const range = (start, stop, step) =>
{
    if (!stop) 
    {
        // one param defined
        stop = start;
        start = 0;
    }

    if (!step) step = 1;

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) return [];

    const result = [];

    for (let i = start; step > 0 ? i < stop : i > stop; i += step) 
    {
        result.push(i);
    }

    return result;
}
module.exports = getHeaderFile;