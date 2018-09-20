// All code should be written in this file.

let playerOneMoveOneType;
let playerOneMoveOneValue;
let playerOneMoveTwoType;
let playerOneMoveTwoValue;
let playerOneMoveThreeType;
let playerOneMoveThreeValue;
let playerTwoMoveOneType;
let playerTwoMoveOneValue;
let playerTwoMoveTwoType;
let playerTwoMoveTwoValue;
let playerTwoMoveThreeType;
let playerTwoMoveThreeValue;

// function to test overall validity
const isValid = (moveOneType,moveTwoType,moveThreeType,moveOneValue,moveTwoValue,moveThreeValue) => {

  return !totalOver99(moveOneValue,moveTwoValue,moveThreeValue) &&
  valuesOver1(moveOneValue,moveTwoValue,moveThreeValue) &&
  validMoves(moveOneType,moveTwoType,moveThreeType);

}

// helper function to test if the 3 moves are over 99 in total
const totalOver99 = (moveOneValue,moveTwoValue,moveThreeValue) => moveOneValue + moveTwoValue + moveThreeValue > 99;
// helper function to test if each 3 moves are greater than 1
const valuesOver1 = (moveOneValue,moveTwoValue,moveThreeValue) => moveOneValue >= 1 && moveTwoValue >= 1 && moveThreeValue >=1;
// helper function to test if we're supplied with  a valid move types
const validMoves = (moveOneType,moveTwoType,moveThreeType) => {

  // check for undefined variables first
  if (typeof moveOneType === 'string' && typeof moveTwoType === 'string' && typeof moveThreeType === 'string') {

    return  (moveOneType === 'rock' || moveOneType === 'paper' || moveOneType === 'scissors') &&
            (moveTwoType === 'rock' || moveTwoType === 'paper' || moveTwoType === 'scissors') &&
            (moveThreeType === 'rock' || moveThreeType === 'paper' || moveThreeType ==='scissors');
  }

  return false

}

const roundWinnerCalculator = (playerOneMoveType,playerOneMoveValue,playerTwoMoveType,playerTwoMoveValue) => {

  //check all values have been supplied
  if (!playerOneMoveType || !playerOneMoveValue || !playerTwoMoveType || !playerTwoMoveValue) {
    return null
  }

  // check who wins
  if (playerOneMoveType === 'rock' && playerTwoMoveType === 'scissors') {
    return 'Player One'
  }
  if (playerOneMoveType === 'rock' && playerTwoMoveType === 'paper') {
    return 'Player Two'
  }
  if (playerOneMoveType === 'scissors' && playerTwoMoveType === 'rock') {
    return 'Player Two'
  }
  if (playerOneMoveType === 'scissors' && playerTwoMoveType === 'paper') {
    return 'Player One'
  }
  if (playerOneMoveType === 'paper' && playerTwoMoveType === 'rock') {
    return 'Player One'
  }
  if (playerOneMoveType === 'paper' && playerTwoMoveType === 'scissors') {
    return 'Player Two'
  }
  //resolve a tie
  if (playerOneMoveType === playerTwoMoveType){

      if (playerOneMoveValue > playerTwoMoveValue){
        return 'Player One'
      }
      if (playerOneMoveValue < playerTwoMoveValue){
        return 'Player Two'
      }
      if (playerOneMoveValue === playerTwoMoveValue) {
        return 'Tie'
      }

  }

}

// function to assign valid moves and values to the global variables
const setPlayerMoves = (player,moveOneType,moveOneValue,moveTwoType,moveTwoValue,moveThreeType,moveThreeValue) => {

// first check if the input is valid for the move type and values
if (isValid(moveOneType,moveTwoType,moveThreeType,moveOneValue,moveTwoValue,moveThreeValue)){

  switch (player) {

      case 'Player One':
        playerOneMoveOneType = moveOneType;
        playerOneMoveOneValue = moveOneValue;
        playerOneMoveTwoType = moveTwoType;
        playerOneMoveTwoValue = moveTwoValue;
        playerOneMoveThreeType = moveThreeType;
        playerOneMoveThreeValue = moveThreeValue;
        break;
      case 'Player Two':
        playerTwoMoveOneType = moveOneType;
        playerTwoMoveOneValue = moveOneValue;
        playerTwoMoveTwoType = moveTwoType;
        playerTwoMoveTwoValue = moveTwoValue;
        playerTwoMoveThreeType = moveThreeType;
        playerTwoMoveThreeValue = moveThreeValue;
        break;

  }


}


}

const getRoundWinner = round => {

    switch (round) {

        case 1:
          return roundWinnerCalculator(playerOneMoveOneType,playerOneMoveOneValue,playerTwoMoveOneType,playerTwoMoveOneValue);

        case 2:
          return roundWinnerCalculator(playerOneMoveTwoType,playerOneMoveTwoValue,playerTwoMoveTwoType,playerTwoMoveTwoValue);

        case 3:
          return roundWinnerCalculator(playerOneMoveThreeType,playerOneMoveThreeValue,playerTwoMoveThreeType,playerTwoMoveThreeValue);
        default:
          return null
    }
}

const getGameWinner = () => {


    let playerOnePoints = 0;
    let playerTwoPoints = 0;


    // get round 1 results
    switch (getRoundWinner(1)) {
      case 'Player One':
        playerOnePoints++;
        break;
      case 'Player Two':
        playerTwoPoints++;
        break;
      case 'Tie':
        playerOnePoints++;
        playerTwoPoints++;
        break;
      default:
        return null
    }

    // get round 1 results
    switch (getRoundWinner(2)){
      case 'Player One':
        playerOnePoints++;
        break;
      case 'Player Two':
        playerTwoPoints++;
        break;
      case 'Tie':
        playerOnePoints++;
        playerTwoPoints++;
        break;
      default:
        return null

    }

    // get round 1 results
    switch (getRoundWinner(3)){
      case 'Player One':
        playerOnePoints++;
        break;
      case 'Player Two':
        playerTwoPoints++;
        break;
      case 'Tie':
        playerOnePoints++;
        playerTwoPoints++;
        break;
      default:
        return null;
    }

    // decide the winner
    if (playerOnePoints > playerTwoPoints) {
      return 'Player One';
    }

    if (playerOnePoints < playerTwoPoints) {
      return 'Player Two';
    }

    if (playerOnePoints === playerTwoPoints) {
      return 'Tie';
    }

}

// helper function to choose the compter move from a random number
const getComputerMovetype = (number) => {

  switch (number) {

    case 0:
      return 'rock';
    case 1:
      return 'paper';
    case 2:
      return 'scissors'

  }

}

const setComputerMoves = () => {
  debugger;


  let limit = 99;
  moveOneValue = Math.floor(1 + Math.random()*limit - 2); // 1 + becuase e don't want a zero value, -2 becuase we need to assign rnd2&3 atleast 1
  // minus the score accounting for round one
  limit -= moveOneValue;
  moveTwoValue = Math.floor(1 + Math.random()*limit);
  // assign the remainder to the final move
  moveThreeValue = limit -= moveTwoValue;

  // randomly choose moveOneType
  moveOneType = getComputerMovetype(Math.floor(Math.random()*2));
  moveTwoType = getComputerMovetype(Math.floor(Math.random()*2));
  moveThreeType = getComputerMovetype(Math.floor(Math.random()*2));

  setPlayerMoves ('Player Two',moveOneType,moveOneValue,moveTwoType,moveTwoValue,moveThreeType,moveThreeValue);

}
