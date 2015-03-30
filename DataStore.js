'use strict';

var _ = require('lodash');
var lz = require('lz-string');
var Utils = require('./Utils');
var sampleJson = require('./sampleData.json');


function DataStore (key) {
  this.key = key;
  // initialize with sample data
  this.initialize();
  this._events = {};
}

DataStore.prototype.initialize = function () {
  if (this._initFromUrl()) return;
  if (localStore(this.key)) {
    this.data = localStore(this.key);
  }
  else {
    this._setSampleData();
  }
};

DataStore.prototype._setSampleData = function () {
  this.data = _.cloneDeep(sampleJson);
};

DataStore.prototype._initFromUrl = function () {
  // if share url present, init data from url and return true
  // if not present, return false
  if (!window.location.hash) return false;
  var m = /#\/share\/(.+)/.exec(decodeURIComponent(window.location.hash));
  if (m[1]) {
    try {
      var rawData = lz.decompressFromEncodedURIComponent(m[1]);
      this.data = JSON.parse(rawData);
    }
    catch (e) { return false; }
    return true;
  }
  else return false;
};

DataStore.prototype.subscribe = function (eventType, cb) {
  var events = this._events[eventType] || (this._events[eventType] = []);
  events.push(cb);
};

DataStore.prototype.inform = function (eventType) {
  var events;
  switch (eventType) {
    case 'reset':
      events = _.reduce(this._events, function (res, val) {
        return res.concat(val)
      });
      break;

    case 'change':
    default:
      events = this._events[eventType];
      break;
  }

  events.forEach(function (cb) {
    cb();
  });
};

DataStore.prototype.getData = function () {
  return this.data;
},

DataStore.prototype.update = function (newData) {
  this.data = newData;
  localStore(this.key, this.data);
  this.inform('change');
};

DataStore.prototype.resetData = function () {
  window.localStorage.removeItem(this.key);
  this._setSampleData();
  this.inform('reset');
};

module.exports = DataStore;


// Helper functions

// save data to localstorage   – localStore('my-data')
// get data from localstorage  – localStore('my-data', 'foobar')
function localStore (namespace, data) {
  if (data) {
    return window.localStorage.setItem(namespace, JSON.stringify(data));
  }

  var store = window.localStorage.getItem(namespace);
  return (store && JSON.parse(store)) || "";
}
