'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');

module.exports = Collection;

function Collection (collection) {
    EventEmitter.call(this);
    this.collection = collection;
    this.saved = {};
};

Collection.prototype.each = function (cb) {
    var that = this;
    this.collection = this.collection.map(function (item, index, arr) {
        cb.call(that, item, index, arr);
        return item;
    });
};

Collection.prototype.get = function () {
    return this.collection.slice(0);
};

Collection.prototype.update = function () {
    this.emit('update');
};

Collection.prototype.remove = function (id) {
    delete this.saved[id]
};

Collection.prototype.save = function (id) {
    this.saved[id] = {};
};

Collection.prototype.add = function (key, value) {
    var saved = this.saved;
    for (var diff in saved) {
        if (!saved.hasOwnProperty(diff)) continue;
        saved[diff][key] = value;
    };
};

Collection.prototype.dry = function (id) {
    var diff = this.saved[id];
    this.saved[id] = {};
    return diff;
};

util.inherits(Collection, EventEmitter);