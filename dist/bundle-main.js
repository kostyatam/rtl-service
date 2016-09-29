/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);
/******/
/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;
/******/
/******/ 			script.src = __webpack_require__.p + "" + chunkId + ".bundle-" + ({}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	__webpack_require__(2);
	
	__webpack_require__(6);
	
	__webpack_require__(10);
	
	var _map = __webpack_require__(12);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _leftPanel = __webpack_require__(16);
	
	var _leftPanel2 = _interopRequireDefault(_leftPanel);
	
	var _popup = __webpack_require__(24);
	
	var _popup2 = _interopRequireDefault(_popup);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var socket = new WebSocket('ws://localhost:8081');
	
	var locationData = getLocationData().then(function (res) {
	    var id = res.id;
	
	    socket.send(JSON.stringify({ locationId: id }));
	    return res;
	});
	
	var statusData = getStatusData().then(function (res) {
	    var id = res.id;
	
	    socket.send(JSON.stringify({ statusId: id }));
	    return res;
	});
	
	(0, _map2.default)().then(function (data) {
	    var map = data.map;
	    var leafletView = data.leafletView;
	    var PruneCluster = data.PruneCluster;
	
	
	    Promise.all([locationData, statusData]).then(function (promises) {
	        var _promises = promises;
	
	        var _promises2 = _slicedToArray(_promises, 2);
	
	        var locationData = _promises2[0];
	        var statusData = _promises2[1];
	
	        var markers = {};
	
	        locationData.locations.map(function (item) {
	            var mac = item.mac;
	            var location = item.location;
	            var lat = location.lat;
	            var lon = location.lon;
	
	            var marker = new PruneCluster.Marker(lat, lon);
	            leafletView.RegisterMarker(marker);
	            markers[mac] = marker;
	        });
	
	        statusData.statuses.map(function (item) {
	            var mac = item.mac;
	            var status = item.status;
	
	            markers[mac].data.popup = (0, _popup2.default)({
	                name: status.name,
	                mac: mac
	            });
	        });
	
	        map.addLayer(leafletView);
	
	        var leftPanel = new _leftPanel2.default('status', statusData.statuses);
	
	        socket.onmessage = getOnSocketMessage({
	            locationId: locationData.id,
	            statusId: statusData.id,
	            onStatusUpdate: function onStatusUpdate(_ref) {
	                var diff = _ref.diff;
	
	                leftPanel.update(diff);
	            },
	            onLocationUpdate: function onLocationUpdate(res) {
	                requestAnimationFrame(function () {
	                    for (var mac in res.diff) {
	                        if (!res.diff.hasOwnProperty(mac)) return;
	                        var _res$diff$mac = res.diff[mac];
	                        var lat = _res$diff$mac.lat;
	                        var lon = _res$diff$mac.lon;
	
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
	
	function getLocationData() {
	    return new Promise(function (resolve, reject) {
	        var xhr = new XMLHttpRequest();
	        xhr.onprogress = function (event) {
	            var loaded = event.loaded;
	            var total = event.total;
	        };
	
	        xhr.onreadystatechange = function () {
	            if (xhr.readyState != 4) return;
	
	            if (xhr.status === 200) {
	                var res = JSON.parse(xhr.responseText);
	                resolve(res);
	                res = null;
	            }
	        };
	        xhr.open('GET', 'api/data', true);
	        xhr.send();
	    });
	};
	
	function getStatusData() {
	    return new Promise(function (resolve, reject) {
	        var xhr = new XMLHttpRequest();
	        xhr.onprogress = function (event) {
	            var loaded = event.loaded;
	            var total = event.total;
	        };
	
	        xhr.onreadystatechange = function () {
	            if (xhr.readyState != 4) return;
	
	            if (xhr.status === 200) {
	                var res = JSON.parse(xhr.responseText);
	                resolve(res);
	                res = null;
	            }
	        };
	        xhr.open('GET', 'api/status', true);
	        xhr.send();
	    });
	};
	
	var getLocationDiff = function getLocationDiff(id) {
	    return new Promise(function (resolve, reject) {
	        var xhr = new XMLHttpRequest();
	        xhr.onprogress = function (event) {
	            var loaded = event.loaded;
	            var total = event.total;
	        };
	
	        xhr.onreadystatechange = function () {
	            if (xhr.readyState != 4) return;
	
	            if (xhr.status === 200) {
	                var res = JSON.parse(xhr.responseText);
	                resolve(res);
	                res = null;
	                xhr = null;
	            }
	        };
	        xhr.open('GET', 'api/data/' + id, true);
	        xhr.send();
	    });
	};
	
	var getStatusDiff = function getStatusDiff(id) {
	    return new Promise(function (resolve, reject) {
	        var xhr = new XMLHttpRequest();
	        xhr.onprogress = function (event) {
	            var loaded = event.loaded;
	            var total = event.total;
	        };
	
	        xhr.onreadystatechange = function () {
	            if (xhr.readyState != 4) return;
	
	            if (xhr.status === 200) {
	                var res = JSON.parse(xhr.responseText);
	                resolve(res);
	                res = null;
	                xhr = null;
	            }
	        };
	        xhr.open('GET', 'api/status/' + id, true);
	        xhr.send();
	    });
	};
	
	function getOnSocketMessage(_ref2) {
	    var locationId = _ref2.locationId;
	    var statusId = _ref2.statusId;
	    var onLocationUpdate = _ref2.onLocationUpdate;
	    var onStatusUpdate = _ref2.onStatusUpdate;
	
	    var locationUpdating = false;
	    var statusUpdating = false;
	    return function (_ref3) {
	        var data = _ref3.data;
	
	        var _data$split = data.split(':');
	
	        var _data$split2 = _slicedToArray(_data$split, 2);
	
	        var destination = _data$split2[0];
	        var event = _data$split2[1];
	
	        if (destination === 'location' && !locationUpdating) {
	            if (event === 'update') {
	                locationUpdating = true;
	                getLocationDiff(locationId).then(onLocationUpdate).then(function () {
	                    return setTimeout(function () {
	                        locationUpdating = false;
	                    }, 3000);
	                });
	                return;
	            }
	        }
	        if (destination === 'status' && !statusUpdating) {
	            if (event === 'update') {
	                statusUpdating = true;
	                getStatusDiff(statusId).then(onStatusUpdate).then(function () {
	                    return setTimeout(function () {
	                        statusUpdating = false;
	                    }, 3000);
	                });
	                return;
	            }
	        }
	    };
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 11 */,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function () {
	    return new Promise(function (resolve, reject) {
	        __webpack_require__.e/* nsure */(1, function (require) {
	            __webpack_require__(13);
	
	            var _require = __webpack_require__(14);
	
	            var PruneCluster = _require.PruneCluster;
	            var PruneClusterForLeaflet = _require.PruneClusterForLeaflet;
	
	            var map = L.map('map').setView([55, 61], 13);
	            var leafletView = new PruneClusterForLeaflet();
	            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	            }).addTo(map);
	
	            L.Icon.Default.imagePath = '/images';
	            resolve({
	                map: map,
	                leafletView: leafletView,
	                PruneCluster: PruneCluster
	            });
	        });
	    });
	};

/***/ },
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(17);
	
	var _leftPanel = __webpack_require__(19);
	
	var _leftPanel2 = _interopRequireDefault(_leftPanel);
	
	var _leftPanel__list = __webpack_require__(22);
	
	var _leftPanel__list2 = _interopRequireDefault(_leftPanel__list);
	
	var _leftPanel__item = __webpack_require__(23);
	
	var _leftPanel__item2 = _interopRequireDefault(_leftPanel__item);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LeftPanel = function () {
	    function LeftPanel(id) {
	        var statuses = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	
	        _classCallCheck(this, LeftPanel);
	
	        this.el = document.getElementById(id);
	        this.el.innerHTML = (0, _leftPanel2.default)();
	
	        this.prevEl = this.el.getElementsByClassName('btn_prev')[0];
	        this.nextEl = this.el.getElementsByClassName('btn_next')[0];
	        this.items = this.el.querySelector('#items');
	
	        this.statuses = statuses;
	        this.page = 0;
	        this.count = 500;
	        this.render();
	
	        this.prevEl.addEventListener('click', this.prev.bind(this));
	        this.nextEl.addEventListener('click', this.next.bind(this));
	    }
	
	    _createClass(LeftPanel, [{
	        key: 'next',
	        value: function next() {
	            if (this.statuses.length <= this.count * (this.page + 1)) return;
	            this.page++;
	            this.render();
	        }
	    }, {
	        key: 'prev',
	        value: function prev() {
	            if (this.page === 0) return;
	            this.page--;
	            this.render();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this = this;
	
	            var slice = this.statuses.slice(this.page, this.count);
	            this.macs = {};
	            slice.map(function (item) {
	                return _this.macs[item.mac] = item;
	            });
	            this.items.innerHTML = (0, _leftPanel__list2.default)({ statuses: slice });
	        }
	    }, {
	        key: 'update',
	        value: function update(_update) {
	            var statuses = this.statuses;
	
	            for (var i = 0; i < statuses.length; i++) {
	                var item = statuses[i];
	                if (!_update[item.mac]) continue;
	                item.status = _update[item.mac].status;
	            }
	            requestAnimationFrame(this.rerender(this.items.children, this.macs, _update));
	            _update = null;
	        }
	    }, {
	        key: 'rerender',
	        value: function rerender(children, macs, update) {
	            return function () {
	                for (var i = 0; i < children.length; i++) {
	                    var child = children[i];
	                    var mac = child.getAttribute('id');
	                    if (!update[mac]) continue;
	                    var name = macs[mac].status.name;
	                    macs[mac].status = update[mac].status;
	                    child.innerHTML = (0, _leftPanel__item2.default)({ item: macs[mac] });
	                }
	                update = null;
	            };
	        }
	    }]);
	
	    return LeftPanel;
	}();
	
	exports.default = LeftPanel;

/***/ },
/* 17 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 18 */,
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(20);
	
	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	buf.push("<div class=\"header\"><div class=\"btn btn_prev\">prev</div><div class=\"btn btn_next\">next</div></div><div id=\"items\"></div>");;return buf.join("");
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */
	
	exports.merge = function merge(a, b) {
	  if (arguments.length === 1) {
	    var attrs = a[0];
	    for (var i = 1; i < a.length; i++) {
	      attrs = merge(attrs, a[i]);
	    }
	    return attrs;
	  }
	  var ac = a['class'];
	  var bc = b['class'];
	
	  if (ac || bc) {
	    ac = ac || [];
	    bc = bc || [];
	    if (!Array.isArray(ac)) ac = [ac];
	    if (!Array.isArray(bc)) bc = [bc];
	    a['class'] = ac.concat(bc).filter(nulls);
	  }
	
	  for (var key in b) {
	    if (key != 'class') {
	      a[key] = b[key];
	    }
	  }
	
	  return a;
	};
	
	/**
	 * Filter null `val`s.
	 *
	 * @param {*} val
	 * @return {Boolean}
	 * @api private
	 */
	
	function nulls(val) {
	  return val != null && val !== '';
	}
	
	/**
	 * join array as classes.
	 *
	 * @param {*} val
	 * @return {String}
	 */
	exports.joinClasses = joinClasses;
	function joinClasses(val) {
	  return (Array.isArray(val) ? val.map(joinClasses) :
	    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
	    [val]).filter(nulls).join(' ');
	}
	
	/**
	 * Render the given classes.
	 *
	 * @param {Array} classes
	 * @param {Array.<Boolean>} escaped
	 * @return {String}
	 */
	exports.cls = function cls(classes, escaped) {
	  var buf = [];
	  for (var i = 0; i < classes.length; i++) {
	    if (escaped && escaped[i]) {
	      buf.push(exports.escape(joinClasses([classes[i]])));
	    } else {
	      buf.push(joinClasses(classes[i]));
	    }
	  }
	  var text = joinClasses(buf);
	  if (text.length) {
	    return ' class="' + text + '"';
	  } else {
	    return '';
	  }
	};
	
	
	exports.style = function (val) {
	  if (val && typeof val === 'object') {
	    return Object.keys(val).map(function (style) {
	      return style + ':' + val[style];
	    }).join(';');
	  } else {
	    return val;
	  }
	};
	/**
	 * Render the given attribute.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @param {Boolean} terse
	 * @return {String}
	 */
	exports.attr = function attr(key, val, escaped, terse) {
	  if (key === 'style') {
	    val = exports.style(val);
	  }
	  if ('boolean' == typeof val || null == val) {
	    if (val) {
	      return ' ' + (terse ? key : key + '="' + key + '"');
	    } else {
	      return '';
	    }
	  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
	    if (JSON.stringify(val).indexOf('&') !== -1) {
	      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
	                   'will be escaped to `&amp;`');
	    };
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will eliminate the double quotes around dates in ' +
	                   'ISO form after 2.0.0');
	    }
	    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
	  } else if (escaped) {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + exports.escape(val) + '"';
	  } else {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + val + '"';
	  }
	};
	
	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} escaped
	 * @return {String}
	 */
	exports.attrs = function attrs(obj, terse){
	  var buf = [];
	
	  var keys = Object.keys(obj);
	
	  if (keys.length) {
	    for (var i = 0; i < keys.length; ++i) {
	      var key = keys[i]
	        , val = obj[key];
	
	      if ('class' == key) {
	        if (val = joinClasses(val)) {
	          buf.push(' ' + key + '="' + val + '"');
	        }
	      } else {
	        buf.push(exports.attr(key, val, false, terse));
	      }
	    }
	  }
	
	  return buf.join('');
	};
	
	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */
	
	var jade_encode_html_rules = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;'
	};
	var jade_match_html = /[&<>"]/g;
	
	function jade_encode_char(c) {
	  return jade_encode_html_rules[c] || c;
	}
	
	exports.escape = jade_escape;
	function jade_escape(html){
	  var result = String(html).replace(jade_match_html, jade_encode_char);
	  if (result === '' + html) return html;
	  else return result;
	};
	
	/**
	 * Re-throw the given `err` in context to the
	 * the jade in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @api private
	 */
	
	exports.rethrow = function rethrow(err, filename, lineno, str){
	  if (!(err instanceof Error)) throw err;
	  if ((typeof window != 'undefined' || !filename) && !str) {
	    err.message += ' on line ' + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(21).readFileSync(filename, 'utf8')
	  } catch (ex) {
	    rethrow(err, null, lineno)
	  }
	  var context = 3
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);
	
	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');
	
	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Jade') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};
	
	exports.DebugItem = function DebugItem(lineno, filename) {
	  this.lineno = lineno;
	  this.filename = filename;
	}


/***/ },
/* 21 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(20);
	
	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (statuses, undefined) {
	// iterate statuses
	;(function(){
	  var $$obj = statuses;
	  if ('number' == typeof $$obj.length) {
	
	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var item = $$obj[$index];
	
	buf.push("<div" + (jade.attr("id", item.mac, true, true)) + " class=\"item\"><div class=\"item__row\">mac: " + (jade.escape((jade_interp = item.mac) == null ? '' : jade_interp)) + "</div><div class=\"item__row\">name: " + (jade.escape((jade_interp = item.status.name) == null ? '' : jade_interp)) + "</div><div class=\"item__row\"><div" + (jade.cls(['status',item.status.isOnLine ? '' : 'status_offline'], [null,true])) + ">");
	if (item.status.isOnLine)
	{
	buf.push("<span>online</span>");
	}
	else
	{
	buf.push("<span>offline</span>");
	}
	buf.push("</div></div></div>");
	    }
	
	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var item = $$obj[$index];
	
	buf.push("<div" + (jade.attr("id", item.mac, true, true)) + " class=\"item\"><div class=\"item__row\">mac: " + (jade.escape((jade_interp = item.mac) == null ? '' : jade_interp)) + "</div><div class=\"item__row\">name: " + (jade.escape((jade_interp = item.status.name) == null ? '' : jade_interp)) + "</div><div class=\"item__row\"><div" + (jade.cls(['status',item.status.isOnLine ? '' : 'status_offline'], [null,true])) + ">");
	if (item.status.isOnLine)
	{
	buf.push("<span>online</span>");
	}
	else
	{
	buf.push("<span>offline</span>");
	}
	buf.push("</div></div></div>");
	    }
	
	  }
	}).call(this);
	}.call(this,"statuses" in locals_for_with?locals_for_with.statuses:typeof statuses!=="undefined"?statuses:undefined,"undefined" in locals_for_with?locals_for_with.undefined: false?undefined:undefined));;return buf.join("");
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(20);
	
	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (item) {
	buf.push("<div class=\"item__row\">mac: " + (jade.escape((jade_interp = item.mac) == null ? '' : jade_interp)) + "</div><div class=\"item__row\">name: " + (jade.escape((jade_interp = item.status.name) == null ? '' : jade_interp)) + "</div><div class=\"item__row\"><div" + (jade.cls(['status',item.status.isOnLine ? '' : 'status_offline'], [null,true])) + ">");
	if (item.status.isOnLine)
	{
	buf.push("<span>online</span>");
	}
	else
	{
	buf.push("<span>offline</span>");
	}
	buf.push("</div></div>");}.call(this,"item" in locals_for_with?locals_for_with.item:typeof item!=="undefined"?item:undefined));;return buf.join("");
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(20);
	
	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (mac, name) {
	buf.push("<div class=\"popup\"><div>name: " + (jade.escape((jade_interp = name) == null ? '' : jade_interp)) + "</div><div>mac: " + (jade.escape((jade_interp = mac) == null ? '' : jade_interp)) + "</div></div>");}.call(this,"mac" in locals_for_with?locals_for_with.mac:typeof mac!=="undefined"?mac:undefined,"name" in locals_for_with?locals_for_with.name:typeof name!=="undefined"?name:undefined));;return buf.join("");
	}

/***/ }
/******/ ]);
//# sourceMappingURL=bundle-main.js.map