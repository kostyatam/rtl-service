'use strict';
import './main.css';
import 'leaflet/dist/leaflet.css';
import './prunecluster/LeafletStyleSheet.css';
import getMap from './map';
import LeftPanel from './left-panel/left-panel.js';
import popup from './popup.jade';

let locationData = getLocationData();
let statusData = getStatusData();

getMap().then(data => {
    let {map, leafletView, PruneCluster} = data;
    let socket = new WebSocket('ws://localhost:8081');

    Promise.all([
        locationData,
        statusData
    ]).then((promises) => {
        let [locationData, statusData] = promises;
        let markers = {};

        locationData.locations.map(item => {
            let {mac, location} = item;
            let {lat, lon} = location;
            let marker = new PruneCluster.Marker(lat, lon);
            leafletView.RegisterMarker(marker);
            markers[mac] = marker;
        });

        statusData.statuses.map(item => {
            let {mac, status} = item;
            markers[mac].data.popup = popup({
                name: status.name,
                mac
            });
        });

        map.addLayer(leafletView);

        let leftPanel = new LeftPanel('status', statusData.statuses);

        socket.onmessage = getOnSocketMessage({
            locationId: locationData.id,
            statusId: statusData.id,
            onStatusUpdate: function ({diff}) {
                leftPanel.update(diff);
            },
            onLocationUpdate: function (res) {
                requestAnimationFrame(function () {
                    for (let mac in res.diff) {
                        if (!res.diff.hasOwnProperty(mac)) return;
                        let {lat, lon} = res.diff[mac];
                        markers[mac].Move(lat, lon);
                    }
                });
                typeof cb === 'function' && cb(res.diff);
                leafletView.ProcessView();
            }
        });
        promises = null;
        locationData = null;
        statusData = null;
    });
});



function getLocationData () {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onprogress = (event) => {
            let {loaded, total} = event;
        };

        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;

            if (xhr.status === 200) {
                let res = JSON.parse(xhr.responseText);
                resolve(res);
                res = null;
            }
        };
        xhr.open('GET', 'api/data', true);
        xhr.send();
    });
};

function getStatusData () {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onprogress = (event) => {
            let {loaded, total} = event;
        };

        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;

            if (xhr.status === 200) {
                let res = JSON.parse(xhr.responseText);
                resolve(res);
                res = null;
            }
        };
        xhr.open('GET', 'api/status', true);
        xhr.send();
    });
};

let getLocationDiff = (id) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onprogress = (event) => {
            let {loaded, total} = event;
        };

        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;

            if (xhr.status === 200) {
                let res = JSON.parse(xhr.responseText);
                resolve(res);
                res = null;
                xhr = null;
            }
        };
        xhr.open('GET', 'api/data/' + id, true);
        xhr.send();
    });
};

let getStatusDiff = (id) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onprogress = (event) => {
            let {loaded, total} = event;
        };

        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;

            if (xhr.status === 200) {
                let res = JSON.parse(xhr.responseText);
                resolve(res);
                res = null;
                xhr = null;
            }
        };
        xhr.open('GET', 'api/status/' + id, true);
        xhr.send();
    });
};

function getOnSocketMessage ({locationId, statusId, onLocationUpdate, onStatusUpdate}) {
    let locationUpdating = false;
    let statusUpdating = false;
    return function ({data}) {
        let [destination, event] = data.split(':');
        if (destination === 'location' && !locationUpdating) {
            if (event === 'update') {
                locationUpdating = true;
                getLocationDiff(locationId)
                    .then(onLocationUpdate)
                    .then(() => setTimeout(function () {locationUpdating = false}, 3000));
                return
            }
        }
        if (destination === 'status' && !statusUpdating) {
            if (event === 'update') {
                statusUpdating = true;
                getStatusDiff(statusId)
                    .then(onStatusUpdate)
                    .then(() => setTimeout(function () {statusUpdating = false}, 3000));
                return
            }
        }
    }
}


