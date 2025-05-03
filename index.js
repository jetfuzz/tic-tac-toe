const gameboard = (function () {
    let board = [["~", "~", "~",], 
                 ["~", "~", "~"], 
                 ["~", "~", "~"]];

    function display() {
        for (let row of board) {
            const rowString = row.join(" ")
            console.log(rowString);
        }
    }

    function change(row, column, value) {
        if (board[row][column] = "~") {
            board[row][column] = value
        } else {
            console.log("please enter a value space")
        }
    }

    return {display, change}
})();

gameboard.display();
gameboard.change(0, 0, "X");
gameboard.change(1, 1, "O");
gameboard.change(2, 1, "X");
console.log("")
gameboard.display();

function Player () {
    
}


function Game () {

}

function displayController () {

}

