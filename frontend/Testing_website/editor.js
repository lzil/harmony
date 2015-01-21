window.onload = function() {
  abc_editor = new ABCJS.Editor("editor-input", { canvas_id: "sheet-music", warnings_id:"warnings", midi_id:"midi"});
};
$(document).ready(function() {   
  $('#midi').click(function() {
    var url = document.URL;
    MIDIjs.play(url)
  });
});
/*
setInterval(function() {
	$(".sheet-music").children().attr("id", "staff_svg");
}, 3000);
if ($("#test_id")) {
	clearInterval();
};
$(window).on('resize', function(){
    $('#staff_svg').css("transform", "scale(" + $(window).width()/1200 + ")");
});
*/