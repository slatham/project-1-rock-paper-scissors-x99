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
// and to make sure I type them in the correct case
const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';
const P1 = 'Player One';
const P2 = 'Player Two';
const TIE = 'Tie';

// helper function to test overall validity of all moves and values
const isValid = (m1t,m2t,m3t,m1v,m2v,m3v) => !totalOver99(m1v,m2v,m3v) &&
                                              valuesOver1(m1v,m2v,m3v) &&
                                              validMoves(m1t,m2t,m3t);

// helper function to test if the 3 moves are over 99 in total
const totalOver99 = (m1v,m2v,m3v) => m1v + m2v + m3v > 99;
// helper function to test if each 3 moves are greater than 1
const valuesOver1 = (m1v,m2v,m3v) => m1v >= 1 && m2v >= 1 && m3v >=1;
// helper function to test if we're supplied with valid move types
const validMoves = (m1t,m2t,m3t) => {
  // check for undefined variables first, if so bail out!
  if (typeof m1t === 'string' && typeof m2t === 'string' && typeof m3t === 'string') {
      // next check each move for validity
      return validMove(m1t) && validMove(m2t) && validMove(m3t);
  }
}

// helper function to test each individual move for validity
const validMove = move => move === ROCK || move === PAPER || move === SCISSORS;

// helper function to calculate round winners
const roundWinnerCalculator = (p1t,p1v,p2t,p2v) => {

  //check all values have been supplied
  if (!p1t || !p1v || !p2t || !p2v) {
    return null
  }
  // first resolve a tie
  if (p1t === p2t){
    if (p1v === p2v) {
      return TIE
    }
    // if p1 value for round is gtr than p2's, P1 is winner - else P2 is.
    return  p1v > p2v ? P1 : P2;
  }
  // check who wins when it isn't a tie
  switch (p1t) {
    case ROCK: return p2t === SCISSORS ? P1 : P2;
    case PAPER: return p2t === ROCK ? P1 : P2;
    case SCISSORS : return p2t === PAPER ? P1 : P2;
  }
}

// function to assign valid moves to the constants defined at the start
const setPlayerMoves = (player,m1t,m1v,m2t,m2v,m3t,m3v) => {

// first check if the input is valid for the move type and values
if (isValid(m1t,m2t,m3t,m1v,m2v,m3v)){
  // if valid, assing the values and types to the constant variables
  // for player 1 and 2
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

// function to determine the winner of each round
const getRoundWinner = round => {
    // for each round (1-3) see who wins by passing all the variables to
    // the helpter function
    switch (round) {
        case 1:
          return roundWinnerCalculator(playerOneMoveOneType,
            playerOneMoveOneValue,playerTwoMoveOneType,playerTwoMoveOneValue);
        case 2:
          return roundWinnerCalculator(playerOneMoveTwoType,
            playerOneMoveTwoValue,playerTwoMoveTwoType,playerTwoMoveTwoValue);
        case 3:
          return roundWinnerCalculator(playerOneMoveThreeType,
            playerOneMoveThreeValue,playerTwoMoveThreeType,playerTwoMoveThreeValue);
        default:
          return null
    }
}

// function to determine the overall game winner
const getGameWinner = () => {
    // set up variables to hold the running
    // score for each player
    let playerOnePoints = 0;
    let playerTwoPoints = 0;

    /*
      For each round run the helper function to determine the winner,
      that passes back the winner name, based on that we increment
      that player's scores.
    */

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

    // get round 2 results
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

    // get round 3 results
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

    // check for a tie
    if (playerOnePoints === playerTwoPoints) {
      return TIE;
    }

    // not tie so decide the winner
    return playerOnePoints > playerTwoPoints ? P1 : P2;
}

// helper function to choose the computer move from a random number
const getComputerMovetype = (number) => {

  switch (number) {
    case 0: return ROCK;
    case 1: return PAPER;
    case 2: return SCISSORS
  }
}

// function to rndomly set the computer moves
const setComputerMoves = () => {

  // limit - each player gets is 99
  let limit = 99;
  // let computer choose a random number from 1 to 97
  // we need to hold back at least 2 so round 2 & 3 can be
  // at least 1.
  moveOneValue = Math.floor(1 + Math.random()*(limit - 2));
  // minus the value used for rnd1 - remainer we use for rnd2
  limit -= moveOneValue;
  // now choose another random number from 1 to number of points left in limit
  moveTwoValue = Math.floor(1 + Math.random()*(limit - 1));
  // finally, assign the remainder to the final move
  moveThreeValue = limit -= moveTwoValue;

  // randomly choose moveOneType
  moveOneType = getComputerMovetype(Math.floor(Math.random()*2));
  moveTwoType = getComputerMovetype(Math.floor(Math.random()*2));
  moveThreeType = getComputerMovetype(Math.floor(Math.random()*2));

  // set the computer's moves as player 2
  setPlayerMoves (P2,moveOneType,moveOneValue,moveTwoType,
                  moveTwoValue,moveThreeType,moveThreeValue);

}
