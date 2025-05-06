const gameboard = (function () {
    let board = [["~", "~", "~",], 
                 ["~", "~", "~"], 
                 ["~", "~", "~"]];

    function display() {
        for (let row of board) {
            const rowString = row.join(" ");
            console.log(rowString);
        }
    }

    function place(row, column, value) {

        board[row][column] = value;

        display();
        checkWin();
        checkDraw();
    }

    function checkWin () {
        for (let i = 0; i < 3; i++) {
            let rowSum = "";
            for (let j = 0; j < 3; j++) {
                rowSum += board[i][j];
            }
            if (rowSum === "XXX") {
                alert("player 1 wins!");
            } else if (rowSum === "OOO") {
                alert("player 2 wins!");
            }
        }
        for (let i = 0; i < 3; i++) {
            let colSum = "";
            for (let j = 0; j < 3; j++) {
                colSum += board[j][i];
            }
            if (colSum === "XXX") {
                alert("player 1 wins!");
            } else if (colSum === "OOO") {
                alert("player 2 wins!");
            }
        }
        if (board[0][0] === "X" && board[1][1] === "X" && board[2][2] === "X") {
            alert("player 1 wins!");
        } else if (board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "O") {
            alert("player 2 wins!");
        }
        if (board[2][0] === "X" && board[1][1] === "X" && board[0][2] === "X") {
            alert("player 1 wins!");
        } else if (board[2][0] === "O" && board[1][1] === "O" && board[0][2] === "O") {
            alert("player 2 wins!");
        }
    }

    function checkDraw() {
        let emptySpace = 9;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j <3; j++) {
                if (board[i][j] != "~") {
                    emptySpace--;
                    console.log(emptySpace);
                }
                if (emptySpace === 0) {
                    alert("its a draw!")
                }
            }
        }

    }

    return {display, place, checkWin, checkDraw};
})();


function Player (n, m) {
    let name = n;
    let marker = m;

    function move () {
        let row = prompt("Enter row:");
        let column = prompt("Enter column:");
        gameboard.place(row - 1, column - 1, marker);
        gameboard.display();;
    }

    return {name, move};
}


function Game () {
    
}

function displayController () {

}

