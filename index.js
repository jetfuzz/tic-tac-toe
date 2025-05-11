function $(id) {
    return document.getElementById(id)
}

document.addEventListener("DOMContentLoaded", () => {
    displayController.displayBoard();
    displayController.handleClickEvents();
    displayController.handleResetEvent();
})

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
        checkDraw();
        checkWin();
    }

    function checkWin () {
        for (let i = 0; i < 3; i++) {
            let rowSum = "";
            for (let j = 0; j < 3; j++) {
                rowSum += board[i][j];
            }
            if (rowSum === "XXX") {
                displayController.addResultText("Player 1 wins!");
                Game.gameOver();
            } else if (rowSum === "OOO") {
                displayController.addResultText("Player 2 wins!");
                Game.gameOver();
            }
        }
        for (let i = 0; i < 3; i++) {
            let colSum = "";
            for (let j = 0; j < 3; j++) {
                colSum += board[j][i];
            }
            if (colSum === "XXX") {
                displayController.addResultText("Player 1 wins!");
                Game.gameOver();
            } else if (colSum === "OOO") {
                displayController.addResultText("Player 2 wins!");
                Game.gameOver();
            }
        }
        if (board[0][0] === "X" && board[1][1] === "X" && board[2][2] === "X") {
            displayController.addResultText("Player 1 wins!");
            Game.gameOver();
        } else if (board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "O") {
            displayController.addResultText("Player 2 wins!");
            Game.gameOver();
        }
        if (board[2][0] === "X" && board[1][1] === "X" && board[0][2] === "X") {
            displayController.addResultText("Player 1 wins!");
            Game.gameOver();
        } else if (board[2][0] === "O" && board[1][1] === "O" && board[0][2] === "O") {
            displayController.addResultText("Player 2 wins!");
            Game.gameOver();
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
            displayController.addResultText("It's a draw!");
            Game.gameOver();
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

const Game = (function() {
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

    function gameOver() {
        displayController.disableClicks();
    }

    function resetGame() {
        gameboard.reset();
        displayController.displayBoard();
        displayController.enableClicks();
        displayController.handleClickEvents();
        displayController.addResultText("");
    }

    return {p1, p2, handleTurn, getCurrentPlayer, gameOver, resetGame}
})();

const displayController = (function() {
    const gameboardDiv = $("gameboardDiv"); 
    const board = gameboard.getBoard();
    const cell = gameboardDiv.children;

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

    function displayBoard() {
        removeAllChildNodes(gameboardDiv);
        for (let i of board) {
            let div = document.createElement("div");
            let text = document.createTextNode(i);
            div.appendChild(text)
            gameboardDiv.appendChild(div)
        }
    }

    function handleClickEvents() {
        for (let i = 0; i < cell.length; i++) {
            cell[i].addEventListener("click", function () {
                const {row, column} = toCoordinates(i)
                if (cell[i].innerHTML != " ") {
                    cell[i].style.pointerEvents = "none" 
                } else if (Game.getCurrentPlayer() === 1 && cell[i].innerHTML === " ") {
                    Game.p1.move(row, column);
                    this.innerHTML = "X";
                    this.style.color = "mediumSlateBlue";
                    Game.handleTurn();
                } else if (Game.getCurrentPlayer() === 2 && cell[i].innerHTML === " ") {
                    Game.p2.move(row, column);  
                    this.innerHTML = "O";
                    this.style.color = "HotPink";
                    Game.handleTurn();
                }
            })
        }
    }

    function disableClicks() {
        for (let i = 0; i < cell.length; i++) {
            cell[i].style.pointerEvents = "none" 
        }
    }

    function enableClicks() {
        for (let i = 0; i < cell.length; i++) {
            cell[i].style.pointerEvents = "auto";
        }
    }

    function handleResetEvent() {
        $("resetBtn").addEventListener("click", function () {
            Game.resetGame();
        })
    }

    function addResultText(result) {
        $("resultPara").innerHTML = result;
    }

    return {displayBoard,
            handleClickEvents,
            disableClicks,
            enableClicks,
            handleResetEvent,
            addResultText
        }
})();