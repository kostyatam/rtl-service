'use strict';

var faker = require('./faker');
var config = require('./config');
var Collection = require('./collection');
var util = require('util');
var N = config.N;

module.exports = Location;

function Location (options) {
    var locations = this.locations = [];
    for (let i = N;i > 0; i-=1) {
        locations.push({
            mac: faker.getMac(),
            type: 'location',
            ts: Date.now(),
            location: faker.getLocation(options)
        })
    }
    Collection.call(this, locations);
}

Location.prototype.update = function () {
    this.each(function (item) {
        if (Math.random() > .1) return;
        item.location = faker.getLocation({
            lat: [item.location.lat - .01, item.location.lat + .01],
            lon: [item.location.lon - .01, item.location.lon + .01]
        });
        this.add([item.mac], item.location);
    });

    Collection.prototype.update.call(this);
};

util.inherits(Location, Collection);

