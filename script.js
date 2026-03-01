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

cells.forEach(cell => cell.addEventListener("click", playerMove));
restartBtn.addEventListener("click", restartGame);

function playerMove() {
    const index = this.getAttribute("data-index");

    if(board[index] !== "" || !running) return;

    board[index] = "X";
    this.textContent = "X";

    if(checkWinner("X")) return;

    if(!board.includes("")) {
        statusText.textContent = "Draw!";
        running = false;
        return;
    }

    computerMove();
}

function computerMove() {
    let emptyCells = board
        .map((val, idx) => val === "" ? idx : null)
        .filter(val => val !== null);

    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    board[randomIndex] = "O";
    cells[randomIndex].textContent = "O";

    checkWinner("O");
}

function checkWinner(player) {
    for(let condition of winConditions) {
        const [a,b,c] = condition;

        if(board[a] === player && board[b] === player && board[c] === player) {
            statusText.textContent = `Player ${player} Wins!`;
            running = false;

            if(player === "X") {
                xScore++;
                scoreX.textContent = xScore;
            } else {
                oScore++;
                scoreO.textContent = oScore;
            }
            return true;
        }
    }
    return false;
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    running = true;
    statusText.textContent = "Player X's Turn";
    cells.forEach(cell => cell.textContent = "");
}
