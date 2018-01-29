var request = require('superagent');

// Add all the event listeners here
document.getElementById("gamename").addEventListener("click", function () {
  alert("Welcome to Sudoku !! ");
});

document.getElementById("resetb").addEventListener("click", function () {
  console.log("The game is reset");
  document.location.reload();
});

document.getElementById("submitb").addEventListener("click", function () {
  var solved = checkSolution();
  if (solved) {
    alert("Congratulations !! Correct solution ");
  } else {
    alert("Oohoo !! InCorrect solution ");
  }
});

function generateSudokuTable() {
  request('https://sugoku.herokuapp.com/board?difficulty=easy')
  .then(r => {
    console.log("Sudoku table is ", r.body.board );
    if (r.body.board) {
      r.body.board.forEach((thisRow, i) => {
        thisRow.forEach((thisElem, j) => {
          if (thisElem !== 0){
            document.getElementById("cell" + i + j).innerHTML = thisElem;
          }
        })
      });
    }
  })
  
}

function checkSolution() {
  var filledValues = [];
  for(var i = 0; i < 9; i++) {
    var thisLine = [];
    for(var j = 0; j < 9; j++) {
      thisLine[j] = document.getElementById("cell"+i+j).innerText;
      if (!thisLine[j]) {
        thisLine[j] = document.querySelector('#cell'+ i+j +' > input[type="text"]').value;
      }
      thisLine[j] = parseInt(thisLine[j]);
    }
    filledValues.push(thisLine);
  }

  console.log("Filled Vals", filledValues);
  return false;
}

generateSudokuTable();