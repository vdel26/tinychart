'use strict';

var _ = require('lodash');
var sampleJson = require('./sampleData.json');


function DataStore (key) {
  this.key = key;
  // initialize with sample data
  this.data = sampleJson;
  this.onChanges = [];
}

DataStore.prototype.subscribe = function (cb) {
  this.onChanges.push(cb);
};

DataStore.prototype.inform = function () {
  this.onChanges.forEach(function (cb) {
    cb();
  });
};

DataStore.prototype.update = function (newData) {
  this.data = newData;
  persist(this.key, this.data);
  this.inform();
};

DataStore.prototype.resetData = function () {
  this.data = sampleJson;
  this.inform();
};

module.exports = DataStore;


// Helper functions

// save data to localstorage   – persist('my-data')
// get data from localstorage  – persist('my-data', 'foobar')
function persist (namespace, data) {
  if (data) {
    return window.localStorage.setItem(namespace, JSON.stringify(data));
  }

  var store = window.localStorage.getItem(namespace);
  return (store && JSON.parse(store)) || [];
}