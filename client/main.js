'use strict';

var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
    }),
    latlng = L.latLng(55, 61);

var map = L.map('map', { center: latlng, zoom: 4, layers: [tiles] });

var worker = new Worker('worker.js');
worker.onmessage = function (e) {
    var data = e.data;
    if (data.type === 'locations') {
        var markerList = [];
        var markers = L.markerClusterGroup({chunkedLoading: true, chunkProgress: function updateProgressBar (processed, total, ellapsed) {
            console.log('total %s', processed)
        }});
        var locations = data.locations;
        var length = locations.length;
        for (var i = 0; i < 50000; i++) {
            var location = locations[i].location;
            var marker = L.marker(L.latLng(location.lat, location.lon));
            markerList.push(marker);
        }
        markers.addLayers(markerList);
        map.addLayer(markers);
    }
};



