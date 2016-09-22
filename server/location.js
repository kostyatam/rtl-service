'use strict';

var faker = require('./faker');
var config = require('./config');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var N = config.N;

module.exports = Location;

function Location (options) {
    EventEmitter.call(this);
    this.saved = {};
    var locations = this.locations = [];

    for (let i = N;i > 0; i-=1) {
        locations.push({
            mac: faker.getMac(),
            type: 'location',
            ts: Date.now(),
            location: faker.getLocation(options)
        })
    }
}

Location.prototype.get = function () {
    return this.locations.slice(0);
};

Location.prototype.update = function () {
    var locations = this.locations;
    locations.map(function (item, index) {
        if (Math.random() < .5) return;
        item.location = faker.getLocation({
            lat: [item.location.lat - 5, item.location.lat + 5],
            lon: [item.location.lon - 5, item.location.lon + 5]
        });
        var saved = this.saved;
        for (var diff in saved) {
            if (!saved.hasOwnProperty(diff)) return;
            saved[index] = item.location;
        };
    });
    this.emit('update');
};

Location.prototype.save = function (id) {
    this.saved[id] = {};
};

Location.prototype.dry = function (id) {
    var diff = Object.assign({}, this.saved[id]);
    this.saved[id] = {};
    return diff;
};

util.inherits(Location, EventEmitter);

