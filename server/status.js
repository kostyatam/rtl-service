'use strict';
var faker = require('./faker');
var Collection = require('./collection');
var util = require('util');

module.exports = Status;

function Status (locations) {
    var statuses = locations.map(function (location) {
        return {
            mac: location.mac,
            type: 'status',
            ts: Date.now(),
            status: faker.getStatus()
        }
    });
    Collection.call(this, statuses);
}

Status.prototype.update = function () {
    this.each(function (item) {
        if (Math.random() > .1) return;
        item.status = {
            name: item.status.name,
            isOnLine: faker.getIsOnline()
        };
        this.add(item.mac,{status: item.status});
    });
    Collection.prototype.update.call(this);
};

util.inherits(Status, Collection);