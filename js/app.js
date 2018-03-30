// global vars to be used in the app
let player1, player2, playing, gameBoard;
let selectXElement, selectOElement, allBoxes, currentTurn, moved;
const seanImg = `<img class="sean" src="./img/zardoz-connery.png" />`;
const squareImg = `<img class="square-svg" src="./img/vector-square.svg" />`;
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
// select all box classes
allBoxes = document.getElementsByClassName('box');

// get selected from options dropdown
selectXElement = document.getElementById('x-var');
selectOElement = document.getElementById('o-var');
this.player1 = selectXElement.options[selectXElement.selectedIndex].text;
this.player2 = selectOElement.options[selectOElement.selectedIndex].text;
// p1 setter 
const playerOneSelect = (val) => {
  if (val === 'X' ) {
    this.player1 = val;
  }
  this.player1 = squareImg;
};
// p2 setter
const playerTwoSelect = (val) => {
  if (val === 'O') {
    this.player1 = val;
  }
  this.player2 = seanImg;
};


const boxAction = () => {
  moved = 0;
  currentTurn = 1;
  // added listener for inserting SQ or Sean (X or O)
  Array.from(allBoxes).forEach( (link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      let currentBox = document.getElementById(event.target.id);
      
      moved++;
      if (currentTurn === 1) {
        currentBox.innerHTML = this.player1;
        currentBox.style.color = "#5bb6ff";
        currentTurn++;
      } else {
        currentBox.innerHTML = this.player2;
        currentBox.style.color = "#ff03dc";
        currentTurn--;
      }



      console.log(event.target.id);
    })
  })
};
boxAction();


