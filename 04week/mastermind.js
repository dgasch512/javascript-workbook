'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function printBoard() {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

function generateSolution() {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint(guess) {
  // your code here
  // split guess and solution arrays for comparison
  const solutionArray = solution.split('');
  const guessArray = guess.split('');

  let redPegs = 0;
  let whitePegs = 0;
  // if matching return red
  for (let i = 0; i < solutionArray.length; i++) {
    if (solutionArray[i] === guessArray[i]) {
      redPegs++;
      solutionArray[i] = null;
    }
  }

  let targetIndex = null;
  // if matching but index does not match return white pegs
  for (let i = 0; i < guessArray.length; i++) {
    targetIndex = solutionArray.indexOf(guessArray[i]); 
      
      if (targetIndex > -1) {
      whitePegs++;
      solutionArray[targetIndex] = null;
    }
  }

  return `${redPegs}-${whitePegs}`;

  }

  function validInput(guessArray) {
    for (let i=0; i< guessArray.length; i++) {
      if (!letters.includes(guessArray[i])) {
        return false;
      }
    }
    return true;
  }

function mastermind(guess) {
  // solution = 'abcd'; // Comment this out to generate a random solution
  // your code here
  const guessArray = guess.split('');
  // when guess is complete
    if (guessArray.length === 4) {
      // check to see if guess is correct, return response
      if (guess === solution) {

        console.log('You guessed it!');
        return 'You guessed it!';
      } else if (validInput(guessArray)) {
        board.unshift(`${guess}: ${generateHint(guess)}`)
      } else {
        console.log('Not a valid entry');
      }
    } else if (guessArray.length < 4) {
      console.log('Take another guess');
    } else {
      console.log('Too many letters');
    }
}


function getPrompt() {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}

