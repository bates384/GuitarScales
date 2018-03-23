//acts as scale class. used in fretboard.
function Scale(scaleName, root) {
    var notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
    var scaleRules = [];
    var notesInScale = [];


    function getScaleRules(scaleName) {
        switch (scaleName) {
            case "Major":
                //WWHWWWH, or 2, 2, 1, 2, 2, 2, 1
                scaleRules = [2, 2, 1, 2, 2, 2, 1];
                break;
            case "Minor":
                scaleRules = [2, 1, 2, 2, 1, 2, 2];
                break;
            case "Pentatonic Minor":
                scaleRules = [3, 2, 2, 3, 2];
                break;
            case "Pentatonic Major":
                scaleRules = [2, 2, 3, 2, 3];
                break;
            default:
                Console.log("ERROR: unknown scalename");
                break;
        }
    }

    this.getNotesInScale = function (scaleName, root) {
        getScaleRules(scaleName);
        notesInScale.length = scaleRules.length;
        notesInScale[0] = root;

        for (var i = 1; i < scaleRules.length; i++) {
            console.log(notes[(notes.indexOf(notesInScale[i - 1]) + scaleRules[i - 1]) % notes.length]);
            notesInScale[i] = notes[(notes.indexOf(notesInScale[i - 1]) + scaleRules[i - 1]) % notes.length];
        }

        return notesInScale;
    }
}


//acts as class for whole fretboard.
function Fretboard(scaleName, root, stringOneNote, stringTwoNote, stringThreeNote, stringFourNote,
    stringFiveNote, stringSixNote) {

    //these are pixel values relative to our freboard picture used to determine the location of the 
    //div (style = "top: string left: fret")
    const STRING_ONE = 10;
    const STRING_TWO = 54;
    const STRING_THREE = 99;
    const STRING_FOUR = 143;
    const STRING_FIVE = 186;
    const STRING_SIX = 227;
    const FRET_OPEN = -10;
    const FRET_ONE = 48;
    const FRET_TWO = 145;
    const FRET_THREE = 245;
    const FRET_FOUR = 337;
    const FRET_FIVE = 427;
    const FRET_SIX = 511;
    const FRET_SEVEN = 587;
    const FRET_EIGHT = 660;
    const FRET_NINE = 730;
    const FRET_TEN = 797;
    const FRET_ELEVEN = 860;
    const FRET_TWELVE = 920;
    const FRET_THIRTEEN = 976;
    const FRET_FOURTEEN = 1028;
    const FRET_FIFTEEN = 1078;

    const NUM_FRETS = 15;
    const NUM_STRINGS = 6;

    var _scaleName = scaleName;
    var _root = root;
    var _stringOneNote = stringOneNote;
    var _stringTwoNote = stringTwoNote;
    var _stringThreeNote = stringThreeNote;
    var _stringFourNote = stringFourNote;
    var _stringFiveNote = stringFiveNote;
    var _stringSixNote = stringSixNote;

    var _notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

    //this is the array representation of the fretboard. It is a single
    //dimensional array where length is StringNum*FretNum. [0] is open string 1,
    //[15] is open string 2. etc.
    var _fretboard = [];
    _fretboard.length = NUM_FRETS * NUM_STRINGS + NUM_STRINGS;

    //we need a scale object. Calling getNotesInScale
    //returns an array with the notes in scale. we need to store that array.
    var _scale = new Scale();

    this.setScaleName = function(scaleName) {
        _scaleName = scaleName;
    }

    this.setRoot = function (root) {
        _root = root;
    }


    //tune the first string
    this.tuneStringOne = function(){
        _fretboard[0] = _stringOneNote;

        for (var i = 1; i < NUM_FRETS + 1; i++) {
            tempNote = _fretboard[i - 1];
            newNote = _notes[(_notes.indexOf(tempNote) + 1) % _notes.length];
            _fretboard[i] = newNote;
        }
    }

    //tune the second string
    this.tuneStringTwo = function () {
        _fretboard[NUM_FRETS + 1] = _stringTwoNote;

        for (var i = NUM_FRETS + 2; i < 2 * NUM_FRETS+2; i++) {
            tempNote = _fretboard[i - 1];
            newNote = _notes[(_notes.indexOf(tempNote) + 1) % _notes.length];
            _fretboard[i] = newNote;
        }
    }

    //tune the third string
    this.tuneStringThree = function () {
        _fretboard[2 * NUM_FRETS+2] = _stringThreeNote;

        for (var i = 2 * NUM_FRETS + 3; i < 3 * NUM_FRETS+3; i++) {
            tempNote = _fretboard[i - 1];
            newNote = _notes[(_notes.indexOf(tempNote) + 1) % _notes.length];
            _fretboard[i] = newNote;
        }
    }

    //tune the fourth string
    this.tuneStringFour = function() {
        _fretboard[3 * NUM_FRETS+3] = _stringFourNote;

        for (var i = 3 * NUM_FRETS + 4; i < 4 * NUM_FRETS+4; i++) {
            tempNote = _fretboard[i - 1];
            newNote = _notes[(_notes.indexOf(tempNote) + 1) % _notes.length];
            _fretboard[i] = newNote;
        }
    }

    //tune the fifth string
    this.tuneStringFive = function () {
        _fretboard[4 * NUM_FRETS+4] = _stringFiveNote;

        for (var i = 4 * NUM_FRETS + 5; i < 5 * NUM_FRETS+5; i++) {
            tempNote = _fretboard[i - 1];
            newNote = _notes[(_notes.indexOf(tempNote) + 1) % _notes.length];
            _fretboard[i] = newNote;
        }
    }

    //tune the sixth string
    this.tuneStringSix = function () {
        _fretboard[5 * NUM_FRETS+5] = _stringSixNote;

        for (var i = 5 * NUM_FRETS + 6; i < 6 * NUM_FRETS+6; i++) {
            tempNote = _fretboard[i - 1];
            newNote = _notes[(_notes.indexOf(tempNote) + 1) % _notes.length];
            _fretboard[i] = newNote;
        }
    }

    //builds initial state of fretboard
    this.initialize = function() {
        this.tuneStringOne();
        this.tuneStringTwo();
        this.tuneStringThree();
        this.tuneStringFour();
        this.tuneStringFive();
        this.tuneStringSix();
    }

    //get notes in scale
    this.getNotesInScale = function() {
        _notesInScale = _scale.getNotesInScale(_scaleName, _root);
        return _notesInScale;
    }

    //this function takes our current root and scalename and converts that into our actual divs that are used
    //on the fretboard to represent notes.
    this.BuildScale = function () {
        //get the notes that need to be displayed onto the fretboard (the notes in the scale)
        _notesInScale = this.getNotesInScale(_scaleName, _root);

        //create a string that will be output that contains all the html with the note divs.
        var output = "";

        //loop through the notes on each string and if the note is in the scale, output a note for it. if it is the root, make it
        //red, if not, make it grey.
        for (var i = 0; i <= NUM_STRINGS * NUM_FRETS + NUM_STRINGS; i++) {
            if (_notesInScale.indexOf(_fretboard[i]) >= 0) {
                if (_fretboard[i] == _root) {
                    output += "<div name=\"" + _fretboard[i] + "\" class=\"circle root\" style=\"top: " + getYPosition(Math.floor(i / (NUM_FRETS + 1)) + 1) + "px; left: " + getXPosition(i % (NUM_FRETS + 1)) + "px;\">" +
                        _fretboard[i] + "</div > ";
                }
                else {
                    output += "<div  name=\"" + _fretboard[i] + "\" class=\"circle normal\" style=\"top: " + getYPosition(Math.floor(i / (NUM_FRETS + 1)) + 1) + "px; left: " + getXPosition(i % (NUM_FRETS + 1)) + "px;\">" +
                        _fretboard[i] + "</div > ";
                }
            }
        }

        return output;
    }

    function getXPosition(fretNum)
    {
        switch (fretNum) {
            case 0: return FRET_OPEN;
            case 1: return FRET_ONE;
            case 2: return FRET_TWO;
            case 3: return FRET_THREE;
            case 4: return FRET_FOUR;
            case 5: return FRET_FIVE;
            case 6: return FRET_SIX;
            case 7: return FRET_SEVEN;
            case 8: return FRET_EIGHT;
            case 9: return FRET_NINE;
            case 10: return FRET_TEN;
            case 11: return FRET_ELEVEN;
            case 12: return FRET_TWELVE;
            case 13: return FRET_THIRTEEN;
            case 14: return FRET_FOURTEEN;
            case 15: return FRET_FIFTEEN;

            default:
                Console.log("ERROR:invalid fret number");
                return -1;
        }
    }

    function getYPosition(stringNum)
    {
        switch (stringNum) {
            case 1: return STRING_ONE;
            case 2: return STRING_TWO;
            case 3: return STRING_THREE;
            case 4: return STRING_FOUR;
            case 5: return STRING_FIVE;
            case 6: return STRING_SIX;
            default:
                Console.log("ERROR: invalid string number");
                return -1;
        }
    }

    this.getRoot = function () {
        return _root;
    }
}


var fretboard = new Fretboard("Major", "C", "E", "B", "G", "D", "A", "E");
fretboard.initialize();


//this is our function that is using the fretboard "class"
function revealFretboard() {
    //get the div to display the fretboard
    var fretboardImg = document.getElementById("fretboard");

    //get the div to display the notes (should be within and absolute to the fretboard div)
    var notes = document.getElementById("notes");

    //first time we've used this. make fretboard visible, initialize Fretboard.
    if (fretboardImg.style.display === "none") {
        fretboardImg.style.display = "block";
    }

    //This is bad practice: probably should have function parameter
    //Grabs the root note and the scale name from the selectors in the html
    var rootElement = document.getElementById("id_root");
    var rootValue = rootElement.options[rootElement.selectedIndex].value;

    //get the scale name from the selector.
    var scaleNameElement = document.getElementById("id_scale");
    var scaleNameValue = scaleNameElement.options[scaleNameElement.selectedIndex].value;

    //uses the root and scalename and sets the fretboard to those values.
    fretboard.setRoot(rootValue);
    fretboard.setScaleName(scaleNameValue);

    //the buildscale method returns the html for the scale.
    notes.innerHTML = fretboard.BuildScale();
    getTriadOptions();
}

//The triad selector should only display the chord options for notes that are in the current scale.
//the user shouldn't be able to select an option for a root that is not in the scale..
function getTriadOptions() {
    var triadSelector = document.getElementById("chord_root");
    var notesInScale = fretboard.getNotesInScale();
    var output = "";
    for (var i = 0; i < notesInScale.length; i++){
        output += "<option value = \"" + notesInScale[i] + "\">" + notesInScale[i] + "</option>";
    }

    triadSelector.innerHTML = output;
}

//if we have triads selected, we display the "normal" view. (grey and red)
function normalizeFretboard(){
    //get all notes
    var notesInScale = document.getElementsByClassName("circle");

    //get the root note
    var root = fretboard.getRoot();
    
    for (var i = 0; i < notesInScale.length; i++) {
        if (notesInScale[i].getAttribute("name") == root) {
            notesInScale[i].setAttribute("class", "circle root");
        }
        else {
            notesInScale[i].setAttribute("class", "circle normal");
        }
    }
}

function greyFretboard() {
    //get all notes
    var notesInScale = document.getElementsByClassName("circle");

    //turn them all grey
    for (var i = 0; i < notesInScale.length; i++) {
        notesInScale[i].setAttribute("class", "circle normal");
    }
}



//gets the value of a selector with id "chord_root" and changes the color of each
//note in that "triad." the first, second, and third note are all different colors to
//show the different inversions of the chord throughout the neck of the guitar.
function showTriad() {
    //reset the current notes on the scale to prevent inaccurate colorization.
    greyFretboard();

    //get the value of the chord selected from the triad drop-down
    var chordElement = document.getElementById("chord_root");
    var chordRoot = chordElement.options[chordElement.selectedIndex].value;

    //get all the notes in the scale
    var notesInScale = fretboard.getNotesInScale();

    //get the value of the note for the 3rd and the 5th. we already have to the root (first)
    var chordThird = notesInScale[(notesInScale.indexOf(chordRoot) + 2) % notesInScale.length];
    var chordFifth = notesInScale[(notesInScale.indexOf(chordRoot) + 4) % notesInScale.length];

    //search the document and separate into the arrays, the note divs for each the 1st, 3rd, and 5th notes.
    var firstNotes = document.getElementsByName(chordRoot);
    var thirdNotes = document.getElementsByName(chordThird);
    var fifthNotes = document.getElementsByName(chordFifth);

    //go through each of the note arrays and change the class attribute to the appropriate
    //circle first, circle third, and circle fifth, to change the color of the note div.
    for (var i = 0; i < firstNotes.length; i++) {
        firstNotes[i].setAttribute("class", "circle first");
    }

    for (var i = 0; i < thirdNotes.length; i++) {
        thirdNotes[i].setAttribute("class", "circle third");
    }

    for (var i = 0; i < fifthNotes.length; i++) {
        fifthNotes[i].setAttribute("class", "circle fifth");
    }
}
