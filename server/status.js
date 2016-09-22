'use strict';
var faker = require('./faker');

module.exports = Status;

function Status (locations) {
    this.statuses = locations.map(function (location) {
        return {
            mac: location.mac,
            type: 'status',
            ts: Date.now(),
            status: faker.getStatus()
        }
    })
}