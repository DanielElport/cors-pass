const express = require('express');
const request = require('request');

const hostname = '127.0.0.1';
const port = 3000;
const app = express();
const server = require("http").Server(app);

app.use((req, res, next) => {

    // Allow CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/*', (req, res) => {

    // use url from route param
    const url = req.url.substr(1);

    // get data from request url
    request({
        url: url,
        method: 'GET',
        encoding: null
    }, (error, response, body) => {

        if (!error) {

            // copy headers
            Object.keys(response.headers).forEach(key => {
                res.setHeader(key, response.headers[key]);
            });

            // forward http response
            res.status(200);
            res.send(body);

        } else {

            // handle error
            res.status(400);
            res.json({error: error.message});
        }
    });

});

// listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
