let player1, player2, playing, gameBoard;
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


// get selected from options dropdown
const selectElement = document.getElementById('x-var');



const playerSelect = (val) => {

  if (player1 !== 'undefined') {
    player1 = val;
  } else {
    player1 = val;
  }
  // if (val === 'X' || val === '&#x25A2;')
  console.log('player1 is:', player1);
  // select the user 
  player1 = val;
  console.log('Value:', val);
}