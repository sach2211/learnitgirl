import { start } from 'repl';

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
    alert("Oohoo !! Incorrect solution ");
  } else {
    alert("Congratulations !! Correct solution ");
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
  return isValidSolution(filledValues);
  // return false;
}

function isValidSolution(matrix) {

  checkEachRow(matrix);
  checkEachColumn(matrix);
  checkEachSubMatrix(matrix);

}

function checkEachRow(matrix) {
  // for each row
  for (var i = 0; i < 9; i++) {
    // check this row for duplicates
    var numArr = [];
    for (var j = 0; j < 9; j++) {
      numArr.push(matrix[i][j]);
    }
    checkIfAllUnique(numArr);
  }
}

function checkEachColumn (matrix) {
  // for each row
  for (var i = 0; i < 9; i++) {
    // check this row for duplicates
    var numArr = [];
    for (var j = 0; j < 9; j++) {
      numArr.push(matrix[j][i]);
    }
    checkIfAllUnique(numArr);
  }
}

function checkEachSubMatrix() {
  for (var k = 0; k < 8; k += 3) {
    var numArr = [];
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j ++) {
        numArr.push(matrix[k+i][k+j]);
      }
    }
    checkIfAllUnique(numArr);
  }

}

function checkIfAllUnique(arr) {
  var hash = [];
  for(var i = 1; i <= 9; i++) {
      hash[i] = 0;
  }

  var hasNanNs = false;
  for(var i = 0; i < 9; i++) {
    if (isNaN(arr[i])) {
      hasNanNs = true;
      break;
    } else {
      hash[arr[i]]++;
    }
  }

  if (hasNanNs) return false;

  var allUq = true;
  for (var i = 0; i < 9; i++) {
    if (arr[i] !== 1) {
      allUq = false;
      break;
    }
  }
  return allUq;
}


generateSudokuTable();