'use strict';

var _ = require('lodash');
var sampleJson = require('./sampleData.json');


function DataStore () {
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
    this.inform();
};


module.exports = DataStore;