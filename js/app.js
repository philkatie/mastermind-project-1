// declare all state variables
let guessNum = 1;
let ansNum = 1;
let gameOver = false;
const choices = ["ts1", "ts2", "ts3", "ts4", "ts5", "ts6"];
let secretCode = [];
let playerGuess = [];
let revealCode = [];
const winQuotes =["Traitors never win... but you did!","Players gonna play, play, play, play, play... and win!", "You played this game good and right, and won!"]
const loseQuotes = ["This is one prize you couldn't cheat to win. You lose!", "This is a ruthless game... and you lost!", "You've lost the one real thing you've ever known (this game)", "Lost again with no surprises."]

// setup event listeners
document.querySelector('.answer-bank').addEventListener('click', handleClick);
document.querySelector('.submit').addEventListener('click', compareCodes);
document.querySelector('.replay').addEventListener('click', init);

// init function to start game
function init() {
    // reset variables
    secretCode = [];
    revealCode = [];
    gameOver = false;
    playerGuess = [];
    guessNum = 1;
    ansNum = 1;

    // reset win/loss message to game start message
    document.querySelector('h2').innerText = 'Let the Games Begin!';

    // initialize secretCode
    while (secretCode.length < 4) {
        let addToCode = choices[Math.floor(Math.random() * choices.length)];
        if (secretCode.includes(addToCode)) {
        } else {
            secretCode.push(addToCode);
        }
    }

    // reset guesses and reveal HTML to empty game board
    for (i = 1; i <= 4; i++) {
        for (j = 1; j <=8; j++) {
            document.getElementById(`g${j}a${i}`).innerHTML = '';
            document.getElementById(`g${j}r${i}`).style.backgroundColor = '#ffffff';
        }
        document.getElementById(`sc${i}`).innerHTML = '';
    }
}

init();

// clicking from answer bank to playerGuess
function handleClick(e) {
    if (gameOver !== true) {
        if (e.target.tagName === "IMG") {
            if (playerGuess.length < 4) {
                playerGuess.push(e.target.id);
                let currentGuess = document.getElementById(`g${guessNum}a${ansNum}`);
                currentGuess.innerHTML = `<img src="assets/${e.target.id}.jpeg">`
                ansNum ++;
            }
        }
    }
}

// comparing playerGuess to secretCode;
function compareCodes() {
    // check for game over - prevent guessing if game is over
    if (gameOver !== true) {
        // check for complete guess - prevent submitting guess before all guess slots are full
        if (playerGuess.length === 4) {
            // for each guess slot
            playerGuess.forEach(function(elem, i) {
                // check for inclusion
                if (secretCode.includes(elem)) {
                    // check for position
                    if (playerGuess[i] === secretCode[i]) {
                        revealCode.push('#386238');
                    } else {
                        revealCode.push('#458ab8');
                    };
                } else revealCode.push('#ffffff');
            });

            // sort reveal code so it doesn't correspond to specific guess slots; 
            // intentionally chose colors in alphabetical order bc it seemed easiest
            revealCode.sort();
            
            // pushing reveal code colors to user
            for (i = 1; i <= 4; i++) {
                document.getElementById(`g${guessNum}r${i}`).style.backgroundColor = revealCode[i-1];
            }
            
            // Check for win/lose condition
            checkWin();
            
            // reset indices and arrays for next guess
            ansNum = 1;
            guessNum ++;
            playerGuess = [];
            revealCode = [];
            
            // if game is over, reveal secret code
            if (gameOver === true) {
                for (i = 1; i <=4; i++) {
                    document.getElementById(`sc${i}`).innerHTML = `<img src="assets/${secretCode[i-1]}.jpeg">`
                }
            }
        }
    }
}

// function to check for win condition
function checkWin() {
    // checking individual elements of array against each other or if user has maxed out guesses
    if (
        playerGuess[0] === secretCode[0] && 
        playerGuess[1] === secretCode[1] && 
        playerGuess[2] === secretCode[2] &&
        playerGuess[3] === secretCode[3]) {
        document.querySelector('h2').innerText = winQuotes[Math.floor(Math.random() * winQuotes.length)];
        gameOver = true;
    } else if (guessNum === 8) {
        document.querySelector('h2').innerText = loseQuotes[Math.floor(Math.random() * loseQuotes.length)];
        gameOver = true;
    }    
}