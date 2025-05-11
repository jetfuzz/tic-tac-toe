function $(id) {
    return document.getElementById(id)
}

const gameboard = (function () {
    let board = [[" ", " ", " ",], 
                 [" ", " ", " "], 
                 [" ", " ", " "]];

    function displayConsole() {
        for (let row of board) {
            const rowString = row.join(" ");
            console.log(rowString);
        }
    }

    function getBoard() {
        let rowString = "";
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                rowString += board[i][j];
            }
        }
        return rowString;
    }

    function place(row, column, value) {
        if (board[row][column] === " ") {
            board[row][column] = value;  
        }

        displayConsole();
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
                reset();
            } else if (rowSum === "OOO") {
                alert("player 2 wins!");
                reset();
            }
        }
        for (let i = 0; i < 3; i++) {
            let colSum = "";
            for (let j = 0; j < 3; j++) {
                colSum += board[j][i];
            }
            if (colSum === "XXX") {
                alert("player 1 wins!");
                g1.resetGame();
            } else if (colSum === "OOO") {
                alert("player 2 wins!");
                g1.resetGame();
            }
        }
        if (board[0][0] === "X" && board[1][1] === "X" && board[2][2] === "X") {
            alert("player 1 wins!");
            g1.resetGame();
        } else if (board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "O") {
            alert("player 2 wins!");
            g1.resetGame();
        }
        if (board[2][0] === "X" && board[1][1] === "X" && board[0][2] === "X") {
            alert("player 1 wins!");
            g1.resetGame();
        } else if (board[2][0] === "O" && board[1][1] === "O" && board[0][2] === "O") {
            alert("player 2 wins!");
            g1.resetGame();
        }
    }

    function checkDraw() {
        let emptySpace = 9;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] !== " ") {
                    emptySpace--;
                }
            }
        }
        if (emptySpace === 0) {
            alert("it's a draw!");
            reset();
            displayController.displayBoard();
        }
    }

    function reset() {
        board = [[" ", " ", " ",], 
                 [" ", " ", " "], 
                 [" ", " ", " "]];
    }

    return {displayConsole, place, checkWin, checkDraw, reset, getBoard};
})();

function Player (n, m) {
    let name = n;
    let marker = m;

    function move (row, column) {
        gameboard.place(row, column, marker);
    }

    return {move};
}

function Game () {
    let p1 = Player("player 1", "X");
    let p2 = Player("player 2", "O");
    let currentPlayer = 1;

    function handleTurn() {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        return currentPlayer;
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function resetGame() {
        gameboard.reset();
        displayController.displayBoard();
    }

    function gameOver() {

    }

    return {p1, p2, handleTurn, getCurrentPlayer, resetGame, gameOver}
}

const displayController = (function() {
    function displayBoard() {
        const gameboardDiv = $("gameboardDiv"); 
        const board = gameboard.getBoard();

        removeAllChildNodes(gameboardDiv);

        for (let i of board) {
            let div = document.createElement("div");
            let text = document.createTextNode(i);
            div.appendChild(text)
            gameboardDiv.appendChild(div)
        }
    }

    function handleClick() {
        const gameboardDiv = $("gameboardDiv"); 
        const cell = gameboardDiv.children;

        for (let i = 0; i < cell.length; i++) {
            cell[i].addEventListener("click", function () {
                const {row, column} = toCoordinates(i)
                
                if (g1.getCurrentPlayer() === 1) {
                    g1.p1.move(row, column);
                    this.innerHTML = "X";
                    this.style.color = "cornflowerBlue";
                    g1.handleTurn();
                } else {
                    g1.p2.move(row, column);  
                    this.innerHTML = "O";
                    this.style.color = "coral";
                    g1.handleTurn();
                }
            })
        }
    }

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild)
        }
    }

    function toCoordinates(index) {
        return {
            row: Math.floor(index / 3),
            column: index % 3
        }
    }

    return {displayBoard, handleClick}
})();

let g1 = Game()
displayController.displayBoard()
displayController.handleClick()