var project = function() {
    initialize();
    var sequencer = new Sequencer();
};
var piano = function() {
	$('#piano-controller').click(function() {
    	if($('.piano-cont').hasClass('enabled')) {
	    	$('.piano-cont').slideUp(200);
	    	$('.piano-cont').removeClass('enabled');
			$('.editor-render').removeClass('col-md-8');
			$('.editor-render').removeClass('col-lg-7');
			$('.editor-render').addClass('col-md-10');
			$('.editor-render').addClass('col-lg-9');
	    	$(this).blur();
	    }
	    else {
	    	$('.piano-cont').slideDown(200);
	    	$('.piano-cont').addClass('enabled');
			$('.editor-render').removeClass('col-md-10');
			$('.editor-render').removeClass('col-lg-9');
			$('.editor-render').addClass('col-md-8');
			$('.editor-render').addClass('col-lg-7');
	    	$(this).blur();	
	    }
    });
};