/**
 * Piano Part of the Piano roll
 */

function insertTextAtCursor(el, text) {
  var val = el.value, endIndex, range;
  if (typeof el.selectionStart != "undefined" && typeof el.selectionEnd != "undefined") {
    endIndex = el.selectionEnd;
    el.value = val.slice(0, el.selectionStart) + text + val.slice(endIndex);
    el.selectionStart = el.selectionEnd = endIndex + text.length;
  } else if (typeof document.selection != "undefined" && typeof document.selection.createRange != "undefined") {
      el.focus();
      range = document.selection.createRange();
      range.collapse(false);
      range.text = text;
      range.select();
  }
}
var Piano = function(sharpHeight, adgHeight, bcefHeight, track) {
    this.track = track;
    this.blackfillStyle = "#aae3ab";
    this.whitefillStyle = "#ddf4fc";
    this.strokeStyle = "#FA6";
    this.whiteWidth = 150;
    this.whiteCanvas = document.getElementById('white-keys');
    this.blackCanvas = document.getElementById('black-keys');
    this.whiteContext = this.whiteCanvas.getContext("2d");
    this.blackContext = this.blackCanvas.getContext("2d");
    this.keys = [];
    this.sharpHeight = sharpHeight;
    this.adgHeight = adgHeight;
    this.bcefHeight = bcefHeight;
    this.blackOffset = sharpHeight / 2;
    this.octaveHeight = 3 * this.adgHeight + 4 * this.bcefHeight; //The height of an entire octave is 7 x the height of a white key
    this.piano = document.getElementById('piano');
    this.container = document.getElementById('piano-container');
    this.blackKeyLookup = [];
    this.whiteKeyLookup = [];
    this.pastKey = null;
};

Piano.prototype.drawNote = function(key, highlight) {
    if (key == undefined) {
        return;
    }
    if (highlight) {
        if (key.black) {
            key.draw(this.blackContext, this.blackfillStyle, this.strokeStyle);
        }
        else {
            key.draw(this.whiteContext, this.whitefillStyle, this.strokeStyle);
        }        
    }
    else {
        if (key.black) {
            key.draw(this.blackContext);
        }
        else {
            key.draw(this.whiteContext);
        }            
    }
};

Piano.prototype.drawPiano = function(startKey, startOctave, numKeys) {
    this.height = 0;
    var notes =  ['g#', 'g', 'f#', 'f', 'e', 'd#', 'd' ,'c#', 'c', 'b', 'a#', 'a'];
    var mappings=[ 8,    7,    6,   5,   4,   3,   2,   1,   0,   11,   10,    9];
    var notesOffset = [
                       this.blackOffset,
                       this.adgHeight - this.blackOffset,
                       this.blackOffset,
                       this.bcefHeight,
                       this.bcefHeight - this.blackOffset,
                       this.blackOffset,
                       this.adgHeight - this.blackOffset,
                       this.blackOffset,
                       this.bcefHeight,
                       this.bcefHeight - this.blackOffset,
                       this.blackOffset,
                       this.adgHeight - this.blackOffset
                       ];
    var startindex = notes.indexOf(startKey);
    var startNote = 12 * startOctave - 8 + mappings[startindex];
    octave = startOctave;
    var nextY = 0;
    for(var i=0, j = startindex; i < numKeys; i++, j = (j + 1) % 12) {
        var frequency =  Math.pow(2, (Math.abs(startNote - i) - 49) / 12) * 440;
        if(notes[j][1] == '#') {
            this.keys[i] = new PianoKey(nextY, this.sharpHeight, notes[j], octave, frequency);
        }
        else if(notes[j] == 'a' || notes[j] == 'd' || notes[j] == 'g') {
            this.height += this.adgHeight;
            this.keys[i] = new PianoKey(nextY, this.adgHeight, notes[j], octave, frequency);
        }
        else {
            this.height += this.bcefHeight;
            this.keys[i] = new PianoKey(nextY, this.bcefHeight, notes[j], octave, frequency);
        }
        if (this.keys[i].note == 'c') {
            octave -= 1;
        }
        nextY += notesOffset[j];
    }
    
    //create lookup table for black keys
    for(var i = 0; i < 12; i++) {
        if (this.keys[i].black) {
            for (var j = 0, k = this.keys[i].y; j < this.keys[i].height; j++, k++) {
                this.blackKeyLookup[k] = i;
            }
        }
    }
    //create lookup table for white keys
    for(var i = 0; i < 12; i++) {
        if (!this.keys[i].black) {
            for (var j = 0, k = this.keys[i].y; j < this.keys[i].height; j++, k++) {
                this.whiteKeyLookup[k] = i;
            }
        }
    }    
    if (this.keys[this.keys.length - 1].black) {
        this.height += this.blackOffset;
    }
    
    this.piano.style.height = this.height + "px";
    this.whiteCanvas.height = this.height;
    this.blackCanvas.height = this.height;
    for (var i = 0; i < this.keys.length; i++) {
        if (this.keys[i].black) {
            this.keys[i].draw(this.blackContext);
        }
        else {
            this.keys[i].draw(this.whiteContext);
        }
    }
    this.piano.onmousedown = (function(e) {
        var x = e.pageX - this.piano.offsetLeft;
        var y = e.pageY - this.piano.offsetTop + this.container.scrollTop;
        var key = this.getKey(x, y);
        this.playNote(key);
        var note = key.note+key.octave;
        var noteVal = note2ABC(note);
        var bop = noteLengthMultiplier();
        var finalNote = noteVal+bop;
        console.log(finalNote);
        $(document).ready(function() {
          $('#abc').val($('#abc').val() + finalNote);
        })

    }).bind(this);
    
    this.piano.onmousemove = (function(e) {
        var x = e.pageX - this.piano.offsetLeft;
        var y = e.pageY - this.piano.offsetTop  + this.container.scrollTop;
        var key = this.getKey(x, y);
        if (key != this.pastKey) {
            this.drawNote(key, true);
            if (this.pastKey != null) {
                this.drawNote(this.pastKey, false);         
            }          
            this.pastKey = key;
        }
    }).bind(this);
    
    this.piano.onmouseout = (function() {
        this.drawNote(this.pastKey, false);
    }).bind(this);

};

Piano.prototype.getHeight = function() {
    return this.keys[this.keys.length - 1].y + this.keys[this.keys.length - 1].height;
};

Piano.prototype.playNote = function(key) {
    if (key == undefined || key == null) {
        return;
    }
    this.track.playNote(key.frequency, 0, 1, 1);
};

Piano.prototype.getKey = function(x, y) {
    var relativeYOffset = y % this.octaveHeight;
    var octaveOffset = 12 * Math.floor(y / this.octaveHeight);
    if (x > 75) {
        return this.keys[this.whiteKeyLookup[relativeYOffset] + octaveOffset];
    }
    else {
        if(y > this.octaveHeight * Math.floor(y / this.octaveHeight) && y < this.octaveHeight * Math.floor(y / this.octaveHeight) + this.blackOffset) {
            return this.keys[this.blackKeyLookup[this.octaveHeight] + octaveOffset - 12];
        }
        return this.keys[this.blackKeyLookup[relativeYOffset] + octaveOffset] || this.keys[this.whiteKeyLookup[relativeYOffset] + octaveOffset];
    }
};


var PianoKey = function (y, height, note, octave, frequency) {
    this.octave = octave;
    this.frequency = frequency || 440;
    this.y = y;
    this.height = height;
    this.note = note;
    if (this.note[1] == '#') {
        this.black = true;
        this.width = 75;
        this.fillStyle = '#000'; 
    }
    else {
        this.black = false;
        this.width = 150;
        this.fillStyle = '#FFF'; 
    }
};

PianoKey.prototype.draw = function(context, fillStyle, strokeStyle) {
    context.fillStyle = fillStyle || this.fillStyle; 
    context.strokeStyle = strokeStyle || '#000';
    context.lineWidth = 0;
    context.fillRect(0, this.y, this.width, this.height);
    context.strokeRect(0, this.y, this.width, this.height);
    if (this.black) {
        context.fillStyle = "#FFF";    
    }
    else {
        context.fillStyle = "#000";             
    }
    context.fillText(this.note.toUpperCase() + this.octave, this.width - 25, this.y + (this.height / 2));    
};

var Sequencer = function () {
    this.song = new Song();
    this.instruments = instrumentList;
    this.tracks = [];
    this.trackNames = [];
    this.pianos = [];
    this.grids = [];
    this.index = 0;

    var i = 0;
    for (var key in instrumentList) {
        this.tracks[i] = this.song.createTrack(this.instruments[key].playFunction);
        this.trackNames[i] = key;
        this.pianos[i] = new Piano(20, 40, 30, this.tracks[i]);
        i++;
    }
    
    //menu   
    console.log(this.tracks);
    console.log(this.index);
    this.drawMain(this.tracks[0]);
    

    setInterval(function() {
        this.save();
    }.bind(this), 1000);

};

Sequencer.prototype.drawMain = function(track, savedNotes) {
    this.index = this.tracks.indexOf(track);
    this.pianos[this.index].drawPiano('c', 7, 60);
};



Sequencer.prototype.save = function() {
    localStorage.setItem('notes', JSON.stringify(this.song.getAllNotes()));
    localStorage.setItem('tempo', this.song.tempo);
};


var initialize = function(startNote) {
    var menuHeight = document.getElementById('menu').clientHeight;
    document.getElementById('quarter').style.border = "inset";
};

var defaultLength = function() {
  var textAreaText = document.getElementById("abc").value;
  var getSixteen = "L: 1/16";
  var getEigth = "L: 1/8";
  var getQuarter = "L: 1/4";
  var getHalf = "L: 1/2";
  var getWhole = "L: 1/1";
  var noteDefault;
  if(textAreaText.search(getSixteen) != -1) {
    noteDefault = 0.0625;
  }
  else if(textAreaText.search(getEigth) != -1) {
    noteDefault = 0.125;
  }
  else if(textAreaText.search(getQuarter) != -1) {
    noteDefault = 0.25;
  }
  else if(textAreaText.search(getHalf) != -1) {
    noteDefault = 0.5;
  }
  else if(textAreaText.search(getWhole) != -1) {
    noteDefault = 1;
  }
  return noteDefault;
}

var noteLength = function() {
  var length = defaultLength();
  var multiplier;
  if(document.getElementById('whole').checked) {
    multiplier = 1/length;
  }
  if(document.getElementById('half').checked) {
    multiplier=0.5/length;
  }
  if(document.getElementById('quarter').checked) {
    multiplier=0.25/length;
  }
  if(document.getElementById('eigth').checked) {
    multiplier=0.125/length;
  }
  if(document.getElementById('sixteenth').checked) {
    multiplier=0.0625/length;
  }

  var multiplierFrac = new Fraction(multiplier);
  return multiplierFrac;
}
var noteLengthMultiplier = function() {
  return noteLength().numerator+"/"+noteLength().denominator;
}

var note2ABC = function(note) {
    var ABCnote;
    switch (note) {
      case "c#2":
        ABCnote = "^C,,"
        break;
      case "d2":
        ABCnote = "D,,"
        break;
      case "d#2":
        ABCnote = "^D,,"
        break;
      case "e2":
        ABCnote = "E,,"
        break;
      case "f2":
        ABCnote = "F,,"
        break;
      case "f#2":
        ABCnote = "^F,,"
        break;  
      case "g2":
        ABCnote = "G,,"
        break;  
      case "g#2":
        ABCnote = "^G,,"
        break;
      case "a2":
        ABCnote = "A,,"
        break;
      case "a#2":
        ABCnote = "^A,,"
        break;
      case "b2":
        ABCnote = "B,,"
        break;

      case "c3":
        ABCnote = "C,"
        break;
      case "c#3":
        ABCnote = "^C,"
        break;
      case "d3":
        ABCnote = "D,"
        break;
      case "d#3":
        ABCnote = "^D,"
        break;
      case "e3":
        ABCnote = "E,"
        break;
      case "f3":
        ABCnote = "F,"
        break;
      case "f#3":
        ABCnote = "^F,"
        break;  
      case "g3":
        ABCnote = "G,"
        break;  
      case "g#3":
        ABCnote = "^G,"
        break;
      case "a3":
        ABCnote = "A,"
        break;
      case "a#3":
        ABCnote = "^A,"
        break;
      case "b3":
        ABCnote = "B,"
        break;

      case "c4":
        ABCnote = "C"
        break;
      case "c#4":
        ABCnote = "^C"
        break;
      case "d4":
        ABCnote = "D"
        break;
      case "d#4":
        ABCnote = "^D"
        break;
      case "e4":
        ABCnote = "E"
        break;
      case "f4":
        ABCnote = "F"
        break;
      case "f#4":
        ABCnote = "^F"
        break;  
      case "g4":
        ABCnote = "G"
        break;  
      case "g#4":
        ABCnote = "^G"
        break;
      case "a4":
        ABCnote = "A"
        break;
      case "a#4":
        ABCnote = "^A"
        break;
      case "b4":
        ABCnote = "B"
        break;

      case "c5":
        ABCnote = "c"
        break;
      case "c#5":
        ABCnote = "^c"
        break;
      case "d5":
        ABCnote = "d"
        break;
      case "d#5":
        ABCnote = "^d"
        break;
      case "e5":
        ABCnote = "e"
        break;
      case "f5":
        ABCnote = "f"
        break;
      case "f#5":
        ABCnote = "^f"
        break;  
      case "g5":
        ABCnote = "g"
        break;  
      case "g#5":
        ABCnote = "^g"
        break;
      case "a5":
        ABCnote = "a"
        break;
      case "a#5":
        ABCnote = "^a"
        break;
      case "b5":
        ABCnote = "b"
        break;

      case "c6":
        ABCnote = "c'"
        break;
      case "c#6":
        ABCnote = "^c'"
        break;
      case "d6":
        ABCnote = "d'"
        break;
      case "d#6":
        ABCnote = "^d'"
        break;
      case "e6":
        ABCnote = "e'"
        break;
      case "f6":
        ABCnote = "f'"
        break;
      case "f#6":
        ABCnote = "^f'"
        break;  
      case "g6":
        ABCnote = "g'"
        break;  
      case "g#6":
        ABCnote = "^g'"
        break;
      case "a6":
        ABCnote = "a'"
        break;
      case "a#6":
        ABCnote = "^a'"
        break;
      case "b6":
        ABCnote = "b'"
        break;

      case "c7":
        ABCnote = "c''"
    }
    return ABCnote;
}