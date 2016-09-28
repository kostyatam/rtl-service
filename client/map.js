'use strict'

export default () => {
    return new Promise((resolve, reject) => {
        require.ensure(['leaflet', './prunecluster/PruneCluster.js'], require => {
            require('leaflet');
            let {PruneCluster, PruneClusterForLeaflet} = require('./prunecluster/PruneCluster.js');
            let map = L.map('map').setView([55, 61], 13);
            let leafletView = new PruneClusterForLeaflet;
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.Icon.Default.imagePath = '/images';
            resolve({
                map,
                leafletView,
                PruneCluster
            });
        })
    });
}