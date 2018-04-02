// global vars to be used in the app
let player = {
  moved: 0,
  currentTurn: 1,
  currentBox: document.getElementById(s1),
  dropdownSeanImg: `<img id="sean" class="sean" src="./img/zardoz-connery.png" />`,
  dropdownSquareImg: `<img id="square" class="square-svg" src="./img/vector-square.svg" />`,
  dropdownElementX: document.getElementById('x-var'),
  dropdownElementO: document.getElementById('o-var'),
  allBoxes: document.getElementsByClassName('box'),
  oneTurn: 1,
  twoTurn: 2,
  wait: 1300,
  oneScore: 0,
  twoScore: 0,
  totalGamePlayed: 0
};

// initialized the players and add inside player object literal
player.one = player.dropdownElementX.options[player.dropdownElementX.selectedIndex].text;
player.two = player.dropdownElementO.options[player.dropdownElementO.selectedIndex].text;

// modal notifier
const modal = document.getElementById('modal');
const notifyModal = document.getElementById('notify-modal');
const undoBtn = document.getElementById('undo');
// Winning Patterns
const WinPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
];

// select player one on every dropdown selection
const playerOneSelect = (val) => {
  return player.one = (val === 'x') ? val.toUpperCase() : player.dropdownSquareImg
};

// select player two on every dropdown selection
const playerTwoSelect = (val) => {
  return player.two = (val === 'o') ? val.toUpperCase() : player.dropdownSeanImg;
};

// close modal notifier handler
const closeModal = () => {
  modal.style.display = 'none';
  restartGame();
};

// notifying user for actionable events or simple alerts
const userAlert = (str) => {
  let player1Score = document.querySelector('#modal #player1-score');
  let player2Score = document.querySelector('#modal #player2-score');
  if (str === 'occupied') {
    notifyModal.style.display = 'flex';
    notifyModal.style.height = '70px';
    document.querySelector('#notify-modal .content').innerHTML = 'Already occupied!';
    setTimeout(() => {
      notifyModal.style.display = 'none';
    }, player.wait);
  } else if (str === 'X' || str === 'O' || str === player.dropdownSeanImg || str === player.dropdownSquareImg) {
    modal.style.display = 'flex';
    document.querySelector('#modal .content').innerHTML = `${str} WON!`;
    player1Score.innerHTML = `Player 1:  ${player.oneScore} of ${player.totalGamePlayed}`;
    player2Score.innerHTML = `Player 2:  ${player.twoScore} of ${player.totalGamePlayed}`;
  } else {
    modal.style.display = 'flex';
    document.querySelector('#modal .content').innerHTML = str;
  }
};

// reset the game and start over
const restartGame = () => {
  // removing disabled from dropdowns
  document.getElementById('reset').disabled = false;
  document.getElementById('x-var').disabled = false;
  document.getElementById('o-var').disabled = false;
  undoBtn.disabled = true;
  // reset all the boxes to default
  Array.from(player.allBoxes).forEach(link => {
    link.innerHTML = '';
    link.style.backgroundColor = '';
    player.currentTurn = 1;
    player.moved = 0;
    player.currentBox = 0;
  });
};


// remove last movement & update the turns
const undo = () => {
  player.currentBox.innerHTML = '';
  player.currentTurn = (player.currentTurn === player.oneTurn) ? player.twoTurn : player.oneTurn;
  player.moved--;
  undoBtn.disabled = true;
}

// find the winner based on the pattern defined
const winCheck = () => {
  if (player.moved > 4) {
    let boxArray = Array.from(player.allBoxes);
    let square = boxArray.map(sq => {
      return sq.innerHTML;
    });

    return WinPatterns.find(el => {
      if (square[el[0]] !== '' && square[el[1]] !== '' && square[el[2]] !== '' &&
        square[el[0]] === square[el[1]] && square[el[1]] === square[el[2]]) {
        // color matched winning square
        Array.from(player.allBoxes).forEach((sqBox, i) => {
          if (i === el[0] || i === el[1] || i === el[2]) {
            sqBox.style.backgroundColor = '#00c306';
            sqBox.style.color = 'white';
          }
        });
        return true;
      } else {
        return false;
      }
    })
  }
};

// begin game ...
const startGame = () => {
  undoBtn.disabled = true;
  // added listener for inserting SQ or Sean (X or O)
  Array.from(player.allBoxes).forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      player.currentBox = document.getElementById(event.target.id);
      // enable undo again
      if (undoBtn.disabled) {
        undoBtn.disabled = false;
      }
      // check existence of img inside each box
      let seanImgExist = player.currentBox.contains(document.getElementById('sean'));
      let squareImgExist = player.currentBox.contains(document.getElementById('square'));

      // check if box occupied
      if (player.currentBox.innerHTML || seanImgExist || squareImgExist) {
        userAlert('occupied');
      } else {
        undoBtn.disabled = false;
        // if box is empty then continue
        player.moved++;
        if (player.currentTurn === 1) {
          player.currentBox.innerHTML = player.one;
          player.currentBox.style.color = '#5bb6ff';
          player.currentTurn++;
        } else {
          player.currentBox.innerHTML = player.two;
          player.currentBox.style.color = '#ff03dc';
          player.currentTurn--;
        }

        // disable the dropdown when players determined
        if (player.moved > 1) {
          document.getElementById('x-var').disabled = true;
          document.getElementById('o-var').disabled = true;
        }
      }

      // check for the winner and announce it
      if (winCheck()) {
        let winner = player.currentTurn === 1 ? player.two : player.one;
        player.totalGamePlayed++;
        if (winner === player.one) {
          player.oneScore++;
        } else if (winner === player.two) {
          player.twoScore++;
        } else {
          player.oneScore = 0;
          player.twoScore = 0;
        }
        userAlert(winner);
      } else {
        if (player.moved >= 9) {
          userAlert('IT\'S A TIE!');
        }
      }
    })
  });
};


startGame();