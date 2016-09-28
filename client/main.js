'use strict';
import 'leaflet/dist/leaflet.css';
import './prunecluster/LeafletStyleSheet.css';
import getMap from './map';
import LeftPanel from './left-panel.js';

let getLocationData = () => {
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

let getStatusData = () => {
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
            markers[mac].data.status = status;
        });

        leafletView.PrepareLeafletMarker = (marker, data) => {
            if (marker.getPopup()) {
                marker.setPopupContent('data.status');
            } else {
                marker.bindPopup('data.status');
            }
        };

        map.addLayer(leafletView);

        let leftPanel = new LeftPanel('status', statusData.statuses);

        socket.onmessage = getOnSocketMessage({
            locationId: locationData.id,
            statusId: statusData.id,
            /*onStatusUpdate: getOnStatusUpdate(statusData.statuses, (diff) => {
                leftPanel.update(diff);
            }),
            onLocationUpdate: getOnLocationUpdate(markers, (diff) => {
                leafletView.ProcessView();
            })*/
        });
        promises = null;
        locationData = null;
        statusData = null;
    });
});

function getOnStatusUpdate (statuses, cb) {
    return function (res) {
        for (let i = 0; i < statuses.length; i++) {
            let item = statuses[i]
            let {mac} = item;
            let changed = res.diff[mac];
            if (!changed) continue;
            statuses[i] = Object.assign({},item, changed);
        };
        typeof cb === 'function' && cb(res.diff);
    }
}
function getOnLocationUpdate (markers, cb) {
    return function (res) {
        for (let mac in res.diff) {
            if (!res.diff.hasOwnProperty(mac)) return;
            let {lat, lon} = res.diff[mac];
            markers[mac].position.lat = lat;
            markers[mac].position.lng = lon;
        }
        typeof cb === 'function' && cb(res.diff);
    }
}

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
                    .then(() => locationUpdating = false);
                return
            }
        }
        if (destination === 'status' && !statusUpdating) {
            if (event === 'update') {
                statusUpdating = true;
                getStatusDiff(statusId)
                    .then(onStatusUpdate)
                    .then(() => statusUpdating = false);
                return
            }
        }
    }
}


