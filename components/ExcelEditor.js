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
      nrows: this.props.initialData.datasets[0].data.length,
      ncols: this.props.initialData.datasets.length,
      data: this.props.initialData
    }
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState({
      nrows: nextProps.initialData.datasets[0].data.length,
      ncols: nextProps.initialData.datasets.length,
      data: nextProps.initialData
    });
  },

  getLabels: function () {
    var headers = document.querySelectorAll('[scope="row"]');
    return Array.prototype.map.call(headers, function (th) {
      return th.textContent;
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

  _keyShouldUpdate: function (keyCode) {
    if (keyCode >= 48 && keyCode <= 90) return true; // [0-9 a-z]
    if (keyCode >= 96 && keyCode <= 105) return true; // numpad 0-9
    if (keyCode === 8 || keyCode === 46) return true; // backspace and delete
    return false;
  },

  onKeyUp: function (evt) {
    if (this._keyShouldUpdate(evt.keyCode)) {
      this.onNewData();
    }
  },

  onNewData: function (evt) {
    this.props.newData(this.getTableData());
  },

  addNewRow: function () {
    this.setState({ 
      nrows: ++this.state.nrows,
      data: this.getTableData()
    });
  },

  deleteRow: function () {
    if (this.state.nrows === 2) return;
    this.setState({ 
      nrows: --this.state.nrows,
      data: this.getTableData()
    }, this.onNewData);
  },

  addNewCol: function () {
    this.setState({
      ncols: ++this.state.ncols,
      data: this.getTableData()
    });
  },

  deleteCol: function () {
    if (this.state.ncols === 1) return;
    this.setState({
      ncols: --this.state.ncols,
      data: this.getTableData()
    }, this.onNewData);
  },

  render: function () {

    // table header 
    var header = [(<th></th>)];
    for (var j=0; j<this.state.ncols; j++) {
      header.push(<th scope='col'>DATASET {j+1}</th>);
    }

    // generate table rows from initial data
    var rows = [];
    for (var i=0; i<this.state.nrows; i++) {
      var rowHeader = [ 
        (<th className='ExcelEditor-header' scope='row' contentEditable="true" onKeyUp={this.onKeyUp}>{this.state.data.labels[i]}</th>) 
        ];
      var row = this.state.data.datasets.map(function (dataset, idx) {
        if (idx >= this.state.ncols) return;
        return (
          <td className='ExcelEditor-cell' contentEditable='true' onKeyUp={this.onKeyUp}>
            {dataset.data[i] ? dataset.data[i] : <br />}
          </td>
        );
      }.bind(this));
      if (this.state.ncols > row.length) {
        row.push(<td className='ExcelEditor-cell' contentEditable='true' onKeyUp={this.onKeyUp}></td>);
      }
      rows.push(<tr>{rowHeader.concat(row)}</tr>);
    }

    return (
      <div className='ExcelEditor'>
        <nav className='ExcelEditor-controls'>
          <div className='ExcelEditor-control'>
            <a onClick={this.addNewRow}>+</a><span>rows</span><a onClick={this.deleteRow}>&ndash;</a>
          </div>
          <div className='ExcelEditor-control'>
            <a onClick={this.addNewCol}>+</a><span>columns</span><a onClick={this.deleteCol}>&ndash;</a>
          </div>
        </nav>
        <div className='ExcelEditor-wrapper'>
          <table className='ExcelEditor-table' ref="table">
            <thead ref="thead">
              <tr>
                { header }
              </tr>
            </thead>
            <tbody ref="tbody">
              { rows }
            </tbody>
          </table>
        </div>
      </div>
    );
  }

});

module.exports = ExcelEditor;
