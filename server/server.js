'use strict';

let WebSocketServer = new require('ws');

let wsServer = new WebSocketServer.Server({
    port: 8081
});

let Location =  require('./location');

let location = new Location({
    lat: [50, 60],
    lon: [60, 62]
});

let Status = require('./status');
let status = new Status(location.locations);

let express = require('express');

let app = express();
let path = require('path');
var id = 0;

wsServer.on('connection', function (ws) {
    var onUpdate = function () {
        ws.send('update');
    };
    location.on('update', onUpdate);
    ws.on('close', function () {
        location.removeListener('update', onUpdate);
    });
});

app.use(express.static(path.resolve(__dirname, '../client')));

app.listen(8080, function () {
    console.log('server is listening on 8080 port');
});

app.get('/api/data', function (req, res) {
    res.send({
        id: id++,
        locations: location.get()
    });
});

app.get('api/diff/:id', function (req, res) {
    var id = req.params.id;
    var diff = location.dry(id);
    res.send(diff);
});

setTimeout(function () {
    location.update();
}, 500);

