'use strict';
var faker = require('./faker');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

module.exports = Status;

function Status (locations) {
    EventEmitter.call(this);
    this.saved = {}
    this.statuses = locations.map(function (location) {
        return {
            mac: location.mac,
            type: 'status',
            ts: Date.now(),
            status: faker.getStatus()
        }
    })
}

Status.prototype.get = function () {
    return this.statuses.slice(0)
};

Status.prototype.update = function () {
    var that = this;
    this.statuses = this.statuses.map(function (item) {
        if (Math.random() > .5) return item;
        item.status = faker.getStatus();
        var saved = that.saved;
        for (var diff in saved) {
            if (!saved.hasOwnProperty(diff)) continue;
            saved[diff][item.mac] = {} || saved[diff][item.mac]
            saved[diff][item.mac] = {status: item.status};
        };
        return item;
    });
    this.emit('update');
};

Status.prototype.save = function (id) {
    this.saved[id] = {};
};

Status.prototype.dry = function (id) {
    var diff = Object.assign({}, this.saved[id]);
    this.saved[id] = {};
    return diff;
};

util.inherits(Status, EventEmitter);