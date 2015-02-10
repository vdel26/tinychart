'use strict';

module.exports = {

  // SVG helper to generate icon code
  // usage: <span dangerouslySetInnerHTML={{__html: Utils.svgHelper('#settings-icon')}}></span>
  svgHelper: function (id) {
    return "<svg class='u-svgIcon' xmlns='http://www.w3.org/2000/svg' ><use xlink:href='" + id + "'></use></svg>";
  },

  // Chart colors for datasets
  colorschemes: [
    {
      fillColor: "rgba(87,198,185,0.1)",
      strokeColor: "rgba(87,198,185,1)",
      pointColor: "rgba(87,198,185,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(122,178,234,1)",
    },
    {
      fillColor: "rgba(163,142,243,0.1)",
      strokeColor: "rgba(163,142,243,1)",
      pointColor: "rgba(163,142,243,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(163,142,243,1)",
    },
    {
      fillColor: "rgba(233,102,132,0.1)",
      strokeColor: "rgba(233,102,132,1)",
      pointColor: "rgba(233,102,132,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(122,178,234,1)",
    },
    {
      fillColor: "rgba(122,178,234,0.1)",
      strokeColor: "rgba(122,178,234,1)",
      pointColor: "rgba(122,178,234,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(122,178,234,1)",
    },
    {
      fillColor: "rgba(230,187,114,0.1)",
      strokeColor: "rgba(230,187,114,1)",
      pointColor: "rgba(230,187,114,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(230,187,114,1)",
    }
  ],

  // assign colorschemes to datasets
  assignColors: function (input, colors) {
    var output = _.cloneDeep(input);
    for (var i=0; i < output.datasets.length; i++) {
      for (var prop in colors[i]) {
        output.datasets[i][prop] = colors[i][prop];
      }
    }
    return output;
  }

};