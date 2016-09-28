'use strict';
var random = Math.random;
var floor = Math.round;;
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

module.exports = new Faker;

function Faker () {
    this.usedMacs = {};
}

Faker.prototype.getMac = function getMac (delimeter) {
    var delimiter = delimeter || '-';
    var usedMacs = this.usedMacs;
    var mac;
    do {
        mac = [
            (floor(random() * 256)).toString(16),
            (floor(random() * 256)).toString(16),
            (floor(random() * 256)).toString(16),
            (floor(random() * 256)).toString(16)
        ].join(delimiter);
    } while (usedMacs[mac]);
    this.usedMacs[mac] = true;
    return mac;
};

Faker.prototype.getLocation = function getLocation (params) {
    var params = params || {};
    var lon = params.lon || [];
    var lat = params.lat || [];
    var alt = params.alt || [];
    return {
        lon: this.getLon(lon[0], lon[1]),
        lat: this.getLat(lat[0], lat[1]),
        alt: this.getAlt(alt[0], alt[1])
    }
};

Faker.prototype.getLat = function getLon (min, max) {
    var min = (min > -90) ? min : -90,
        max = (max < 90) ? max : 90;

    return random() * (max - min) + min;
};

Faker.prototype.getLon = function getLat (min, max) {
    var min = (min > -180) ? min : -180,
        max = (max  < 180) ? max : 180;

    return random() * (max - min) + min;
};

Faker.prototype.getAlt = function getAlt () {

};

Faker.prototype.getIsOnline = function () {
    return random() > .5;
};

Faker.prototype.getName = function () {
    var text = "";
    var length = Math.random() * 8 + 8;
    for( var i=0; i < length; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

Faker.prototype.getStatus = function () {
    return {
        isOnLine: this.getIsOnline(),
        name: this.getName()
    }
};


