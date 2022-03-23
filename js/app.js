// To Do
// 1. add logic gate to prevent reveal from providing duplicate results
// 2. clean up code - I think a lot of these should be separate functions
// 3. add sound effects
// 4. swap images to be hosted on imgur
// 5. remove guess on click - slice method?
// 6. add difficulty - allow secret code to have dupes
// 7. add difficulty - add albums
  
// Pseudocode - Taylor Swift's Masters Mind
// 1. Initialize variables/state
    // A. albums Array of 6 choiced
    // B. gameOver = false
    // C. initialize secretCode as empty array
    // C. initialize playerGuess array as empty array
    // D. something for the reveals probably
    // E. dom elements for:
        // i. secret code
        // ii. reveals for each guess?
        // iii. each album in the choice bank for the player
        // iv. button for player to make guess
// 2. At beginning or on replay, generate State/Init
    // A. Generate Random secretCode from albums array, no duplicates
// 3. Player puts in guess
    // A. Click event listeners for player clicking albums in bank to make choices
        // i. on click, display choice in guess field
        // ii. if clicked within guess field, remove choice
        // iii. maybe slightly advanced to fill in out of order if guess is unclicked?
    // B. click event listener for submit guess button
        // i. on click, evaluate if playerGuess is equal to secretCode
        // ii. if equal, trigger win; gameOver = true
        // iii. if not equal, run reveal function
            // a. check if any albumChoices are in the right place compared to secretCode
                // 1. if yes, add rightPlace revealers
            // b. check if any albumChoices are colors in the secretCode but in a different place
                // 1. if yes, add rightColor revealers
                // 2. be sure to skip any that rightPlace applied to
        // iv. after running reveal, make sure player can put in next guess.
// 4. Repeat part 3 until player gets it right or guesses the max number of times - lets say 8
// 5. If player guesses max times and does not crack the secretCode
    // A. gameOver = true
    // B. losing condition

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
    secretCode = [];
    revealCode = [];
    document.querySelector('h2').innerText = 'Let the Games Begin!';
    // initialize secretCode
    while (secretCode.length < 4) {
        let addToCode = choices[Math.floor(Math.random() * choices.length)];
        if (secretCode.includes(addToCode)) {
        } else {
            secretCode.push(addToCode);
        }
    }
    gameOver = false;
    playerGuess = [];
    guessNum = 1;
    ansNum = 1;
    for (i = 1; i <= 4; i++) {
        for (j = 1; j <=8; j++) {
            document.getElementById(`g${j}a${i}`).innerHTML = '';
            document.getElementById(`g${j}r${i}`).style.backgroundColor = 'white';
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

    // this is real inelegant but we gotta do what we gotta do
    let a1 = 0;
    let a2 = 0;
    let a3 = 0;
    let a4 = 0;
    let a5 = 0;
    let a6 = 0;
    let a = '';


    // check for game over - prevent guessing if game is over
    if (gameOver !== true) {

        // check for complete guess - prevent submitting guess before all guess slots are full
        if (playerGuess.length === 4) {
            // for each guess slot

            // need code for reveal dupes

            // count how many times each guess was guessed
            let guessTally = playerGuess.reduce(function(acc, elem) {
                acc[elem] = acc[elem] ? acc[elem] + 1 : 1;
                return acc;
            }, {});
            console.log(guessTally);

            if (guessTally.ts1 !== undefined) {
                a1 += guessTally.ts1;
            };
            if (guessTally.ts2 !== undefined) {
                a2 += guessTally.ts2;
            };
            if (guessTally.ts3 !== undefined) {
                a3 += guessTally.ts3;
            };
            if (guessTally.ts4 !== undefined) {
                a4 += guessTally.ts4;
            };
            if (guessTally.ts5 !== undefined) {
                a5 += guessTally.ts5;
            };
            if (guessTally.ts6 !== undefined) {
                a6 += guessTally.ts6;
            };

            playerGuess.forEach(function(elem, i) {
                console.log(elem);
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
