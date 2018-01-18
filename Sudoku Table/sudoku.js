var request = require('superagent');

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

generateSudokuTable();