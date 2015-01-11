/** @jsx React.DOM */
var React = require('react');
var Utils= require('../Utils');

var ChartSelector = React.createClass({

  propTypes: {
    switchChartType: React.PropTypes.func.isRequired,
    types: React.PropTypes.array.isRequired
  },

  onSelect: function (newVal) {
    this.props.switchChartType(newVal);
  },

  render: function () {
    var options = this.props.types.map(function (type) {
      return (
        <button className="ChartSelector-button"
                onClick={this.onSelect.bind(null, type)}
                dangerouslySetInnerHTML={{__html: Utils.svgHelper('#' + type + '-chart-icon')}}/>
      );
    }.bind(this));

    return (
      <div className='ChartSelector'>
        {options}
      </div>
    );
  }

});

module.exports = ChartSelector;