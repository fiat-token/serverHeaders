'use strict';

require('dotenv').load();
const RPC = require('./rpc');

class Bitcoin
{
    constructor(connectionParams)
    {
        this.client = new RPC(connectionParams);
    }
    
    async getBlockCount ()
    {
        const blockCount = await this.client.fetch('getblockcount');
        return blockCount;
    }
    
    async getBlockHash (indexBlock)
    {
        const hashBlock = await this.client.fetch('getblockhash', [indexBlock]);
        return hashBlock;
    }
    
    async getBlockHeader (hashBlockHeader, raw=false)
    {
        const rawHeader = await this.client.fetch('getblockheader', [hashBlockHeader, raw]);
        return rawHeader;
    }
}

module.exports = Bitcoin;