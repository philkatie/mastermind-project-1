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