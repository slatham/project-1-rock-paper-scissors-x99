// All code should be written in this file.

// Define the global variables
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

// Set up some constants so I'm not typing shed loads
// and to make sure I type the in the correct case

const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';
const P1 = 'Player One';
const P2 = 'Player Two';
const TIE = 'Tie';

// function to test overall validity
const isValid = (m1t,m2t,m3t,m1v,m2v,m3v) => !totalOver99(m1v,m2v,m3v) &&
                                              valuesOver1(m1v,m2v,m3v) &&
                                              validMoves(m1t,m2t,m3t);

// helper function to test if the 3 moves are over 99 in total
const totalOver99 = (m1v,m2v,m3v) => m1v + m2v + m3v > 99;
// helper function to test if each 3 moves are greater than 1
const valuesOver1 = (m1v,m2v,m3v) => m1v >= 1 && m2v >= 1 && m3v >=1;
// helper function to test if we're supplied with  a valid move types
const validMoves = (m1t,m2t,m3t) => {
  // check for undefined variables first,, if not bail out
  if (typeof m1t === 'string' && typeof m2t === 'string' && typeof m3t === 'string') {
    // next check each move is validity
      return validMove(m1t) && validMove(m2t) && validMove(m3t);
  }

}

// helper function to test each individual move for validity
const validMove = move => move === ROCK || move === PAPER || move === SCISSORS;


const roundWinnerCalculator = (p1t,p1v,p2t,p2v) => {
debugger;
  //check all values have been supplied
  if (!p1t || !p1v || !p2t || !p2v) {
    return null
  }

  //resolve a tie
  if (p1t === p2t){
      if (p1v > p2v){
        return P1
      }
      if (p1v < p2v){
        return P2
      }
      if (p1v === p2v) {
        return TIE
      }
  }

  switch (p1t) {
    case ROCK: return p2t === SCISSORS ? P1 : P2;
    case PAPER: return p2t === ROCK ? P1 : P2;
    case SCISSORS : return p2t === PAPER ? P1 : P2;
  }

}

// function to assign valid moves and valuep1t === SCISSORS && p2t === ROCKs to the global variables
const setPlayerMoves = (player,m1t,m1v,m2t,m2v,m3t,m3v) => {

// first check if the input is valid for the move type and values
if (isValid(m1t,m2t,m3t,m1v,m2v,m3v)){

  switch (player) {

      case P1:
        playerOneMoveOneType = m1t;
        playerOneMoveOneValue = m1v;
        playerOneMoveTwoType = m2t;
        playerOneMoveTwoValue = m2v;
        playerOneMoveThreeType = m3t;
        playerOneMoveThreeValue = m3v;
        break;
      case P2:
        playerTwoMoveOneType = m1t;
        playerTwoMoveOneValue = m1v;
        playerTwoMoveTwoType = m2t;
        playerTwoMoveTwoValue = m2v;
        playerTwoMoveThreeType = m3t;
        playerTwoMoveThreeValue = m3v;
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
      case P1:
        playerOnePoints++;
        break;
      case P2:
        playerTwoPoints++;
        break;
      case TIE:
        playerOnePoints++;
        playerTwoPoints++;
        break;
      default:
        return null
    }

    // get round 1 results
    switch (getRoundWinner(2)){
      case P1:
        playerOnePoints++;
        break;
      case P2:
        playerTwoPoints++;
        break;
      case TIE:
        playerOnePoints++;
        playerTwoPoints++;
        break;
      default:
        return null

    }

    // get round 1 results
    switch (getRoundWinner(3)){
      case P1:
        playerOnePoints++;
        break;
      case P2:
        playerTwoPoints++;
        break;
      case TIE:
        playerOnePoints++;
        playerTwoPoints++;
        break;
      default:
        return null;
    }

    // decide the winner
    if (playerOnePoints > playerTwoPoints) {
      return P1;
    }

    if (playerOnePoints < playerTwoPoints) {
      return P2;
    }

    if (playerOnePoints === playerTwoPoints) {
      return TIE;
    }

}

// helper function to choose the compter move from a random number
const getComputerMovetype = (number) => {

  switch (number) {

    case 0:
      return ROCK;
    case 1:
      return PAPER;
    case 2:
      return SCISSORS

  }

}

const setComputerMoves = () => {
  debugger;

  // limit each player gets is 99
  let limit = 99;
  // let computer choose a random number from 1 to 97
  moveOneValue = Math.floor(1 + Math.random()*(limit - 2)); // 1 + becuase e don't want a zero value, -2 becuase we need to assign rnd2&3 atleast 1
  // minus the value accounting for round one
  limit -= moveOneValue;
  // now choose another random number from 1 to number of points left
  moveTwoValue = Math.floor(1 + Math.random()*(limit - 1));
  // assign the remainder to the final move
  moveThreeValue = limit -= moveTwoValue;

  // randomly choose moveOneType
  moveOneType = getComputerMovetype(Math.floor(Math.random()*2));
  moveTwoType = getComputerMovetype(Math.floor(Math.random()*2));
  moveThreeType = getComputerMovetype(Math.floor(Math.random()*2));



  setPlayerMoves (P2,moveOneType,moveOneValue,moveTwoType,moveTwoValue,moveThreeType,moveThreeValue);

}
