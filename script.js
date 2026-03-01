const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let running = true;
let xScore = 0;
let oScore = 0;

const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

cells.forEach(cell => cell.addEventListener("click", cellClicked));
restartBtn.addEventListener("click", restartGame);

function cellClicked() {
    const index = this.getAttribute("data-index");

    if(board[index] !== "" || !running) return;

    board[index] = currentPlayer;
    this.textContent = currentPlayer;

    checkWinner();
}

function checkWinner() {
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++) {
        const [a,b,c] = winConditions[i];
        if(board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if(roundWon) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        running = false;

        if(currentPlayer === "X") {
            xScore++;
            scoreX.textContent = xScore;
        } else {
            oScore++;
            scoreO.textContent = oScore;
        }
        return;
    }

    if(!board.includes("")) {
        statusText.textContent = "Draw!";
        running = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    running = true;
    currentPlayer = "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => cell.textContent = "");
}