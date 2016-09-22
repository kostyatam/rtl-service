'use strict'

var socket = new WebSocket('ws://localhost:8081');

socket.onmessage = function (event) {
    var data = JSON.parse(event.data);
    postMessage(data)
};