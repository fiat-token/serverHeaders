'use strict';

const fetchPromise = require('node-fetch');

class RPC
{
    constructor(connectionParams) 
    {
        if(connectionParams.user == undefined) throw new Error("no user has been given");
        if(connectionParams.password == undefined) throw new Error("no password has been given");
        if(connectionParams.socket == undefined) throw new Error("no socket has been given");

        this.user = connectionParams.user;
        this.password = connectionParams.password;
        this.header = { 'Authorization': this.getBasicAuth(this.user, this.password) };
        this.socket = connectionParams.socket;
        this.counter = 0;
        console.log("RPC-user: " + this.user);
        console.log("RPC-password: " + this.password);
        console.log("RPC-socket: " + this.socket);
        console.log();
    }

    async fetch(method = '', param = [])
    {
        try
        {
            const bodyJSON =
            {
                method: method,
                params: param,
                id: this.counter++
            }
            const body = JSON.stringify(bodyJSON);
            const res = await fetchPromise(this.socket, { method: 'POST',  headers: this.header, body: body})
            //console.log("status code: " + res.status + " (" + res.statusText + ")" );
            //console.log("counter: " + this.counter);
            const json = await res.json();
            if(json.error) throw new Error(json.error.message);
            return json.result;
        }
        catch(err)
        {
            console.error("fetch-" + method + ": " + err);
        }
    }

    getBasicAuth(user, password)
    {
        try
        {
            if(user == undefined) throw new Error("no user has been given");
            if(password == undefined) throw new Error("no password has been given");
            const strAuth = 'Basic ' + new Buffer(user + ':' + password).toString('base64'); 
            return strAuth;
        }
        catch(err)
        {
            console.error("getBasicAuth: " + err);
        }
    }
}

module.exports = RPC;