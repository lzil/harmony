window.onload = function() {
  abc_editor = new ABCJS.Editor("editor-input", { canvas_id: "sheet-music", warnings_id:"warnings", midi_id:"midi"});
}
$(document).ready(function() {   
  $('#midi').click(function() {
    var url = document.URL;
    MIDIjs.play(url)
  });
});
