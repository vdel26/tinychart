/** @jsx React.DOM */
var React = require('react');

var _ = require('lodash');

var ExcelEditor = React.createClass({

  propTypes: {
    newData: React.PropTypes.func.isRequired,
    initialData: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      nrows: this.props.initialData.datasets[0].data.length
    }
  },

  componentDidMount: function () {
    // console.log(this.props.initialData);
    // console.log(this.refs.tbody);
    // this.table = document.querySelector('table');
    // this.dataCells = this.table.querySelectorAll('tr > td');
    // this.rows = this.table.querySelectorAll('tr');
    // this.rows = Array.prototype.slice.call(this.rows, 1);

    // this.ncols = this.rows[0].children.length - 1;

    // this.initEvents();
  },

  componentWillReceiveProps: function (nextProps) {
    this.forceUpdate();
  },

  getLabels: function () {
    var headers = document.querySelectorAll('[scope="row"]');
    return Array.prototype.map.call(headers, function (th) {
      return th.innerText;
    });
  },

  getTableData: function () {
    var data = {};
    data.labels = this.getLabels();
    data.datasets = [];

    // walk the table in rows and get data
    var rows = this.refs.tbody.getDOMNode().querySelectorAll('tr');
    Array.prototype.forEach.call(rows, function (row, i) {
      var rowCells = row.querySelectorAll('td');
      return Array.prototype.map.call(rowCells, function (cell, j) {
        if (!data.datasets[j]) { 
          data.datasets[j] = {};
          data.datasets[j].data = [];
        }
        data.datasets[j].data.push(parseInt(cell.textContent, 10));
      });
    });

    return data;
  },

  onNewData: function (data) {
    // TODO: debounce updates
    this.props.newData(this.getTableData());
  },

  addNewRow: function () {
    this.setState({ nrows: ++this.state.nrows });
  },

  deleteRow: function () {
    // TODO: only delete if there is no data
    this.setState({ nrows: --this.state.nrows });
  },

  render: function () {
    var divStyle = {
      width: '100%',
      height: '100%',
    };

    // table header 
    var header = [(<th></th>)];
    this.props.initialData.datasets.forEach(function (dataset, idx) {
      header.push(<th scope='col'>DATASET {idx+1}</th>);
    });

    // generate table rows from initial data
    var rows = [];
    for (var i=0; i<this.state.nrows; i++) {
      var rowHeader = [ 
        (<th className='ExcelEditor-header' scope='row' contentEditable="true" onKeyUp={this.onNewData}>{this.props.initialData.labels[i]}</th>) 
        ];
      var row = this.props.initialData.datasets.map(function (dataset) {
        return (
          <td className='ExcelEditor-cell' contentEditable='true' onKeyUp={this.onNewData}>
            {dataset.data[i]}
          </td>
        );
      }.bind(this));
      rows.push(<tr>{rowHeader.concat(row)}</tr>);
    }

    return (
      <div className='ExcelEditor' style={divStyle}>
        <table className='ExcelEditor-table' ref="table">
          <thead>
            { header }
          </thead>
          <tbody ref="tbody">
            { rows }
          </tbody>
        </table>
        <button ref="newrow" onClick={this.addNewRow}>add row</button>
        <button ref="deleterow" onClick={this.deleteRow}>delete row</button>
      </div>
    );
  }

});

module.exports = ExcelEditor;
