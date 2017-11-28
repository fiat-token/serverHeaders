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

const getTransactions = async () =>
{
    try
    {
        const transactions = [];
        const blockCount = await btc.getBlockCount();

        for(const index of range(blockCount))
        {
            const hashBlock = await btc.getBlockHash(index);
            const block = await btc.getBlock(hashBlock);
            for(const txid of block.tx)
            {
                const tx = await btc.getRawTransaction(txid);
                transactions.push(tx);
            }
        }
        return transactions;
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports = getTransactions;