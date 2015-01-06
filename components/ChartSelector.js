/** @jsx React.DOM */
var React = require('react');


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
      return <li className={"u-icon ChartSelector-" + type} onClick={this.onSelect.bind(null, type)} />;
    }.bind(this));

    return (
      <ul className='ChartSelector'>
        {options}
      </ul>
    );
  }

});

module.exports = ChartSelector;