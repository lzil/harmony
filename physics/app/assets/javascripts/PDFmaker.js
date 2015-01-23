$(document).ready(function() {
	var specialElementHandlers = {
  	'#editor': function (element, renderer) {
 	    return true;
 	  }
	};

	function getSVG() {
		var svgList = document.getElementsByTagName("svg");
		return svgList[0];
	}

	$('#cmd').click(function () {
		var svg = getSVG();
		canvg(document.getElementById('PDFcanvas'), svg.outerHTML);
		var canvas = document.getElementById('PDFcanvas'), ctx = canvas.getContext('2d');
		canvas.toBlob(function(blob) {
			saveAs(blob,"thing.png");
		});
	});

});