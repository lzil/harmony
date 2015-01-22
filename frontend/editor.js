window.onload = function() {
  
};
$(document).ready(function() {   
  abc_editor = new ABCJS.Editor("editor-input", { canvas_id: "sheet-music", warnings_id:"warnings", midi_id:"midi"});
  $('#midi').click(function() {
    var url = document.URL;
    MIDIjs.play(url)
  });
});