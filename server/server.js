'use strict';
let config = require('./config');
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
let status = new Status(location.get());

let express = require('express');

let app = express();
let path = require('path');
var locationId = 0;
var statusId = 0;

wsServer.on('connection', function (ws) {
    var onLocationUpdate = function () {
        ws.send('location:update');
    };
    var onStatusUpdate = function () {
        ws.send('status:update');
    };
    location.on('update', onLocationUpdate);
    status.on('update', onStatusUpdate);
    ws.on('close', function () {
        location.removeListener('update', onLocationUpdate);
        status.removeListener('update', onStatusUpdate);
    });
});

app.use(express.static(path.resolve(__dirname, '../dist')));


app.get('/api/data', function (req, res) {
    var newId = locationId++;
    location.save(newId);
    res.send({
        id: newId,
        locations: location.get()
    });
});

app.get('/api/data/:id', function (req, res) {
    var id = req.params.id;
    var diff = location.dry(id);
    res.send({
        diff: diff
    });
});

app.get('/api/status', function (req, res) {
    var newId = statusId++;
    status.save(newId);
    res.send({
        statuses: status.get(),
        id: newId
    })
});

app.get('/api/status/:id', function (req, res) {
    var id = req.params.id;
    var diff = status.dry(id);
    res.send({
        diff: diff
    });
});

setInterval(function () {
    location.update();
}, config.L);

setInterval(function () {
    status.update();
}, config.S);


app.listen(8082, function () {
    console.log('server is listening on 8082 port');
});
