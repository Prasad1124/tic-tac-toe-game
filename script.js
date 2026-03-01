const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const difficultySelect = document.getElementById("difficulty");

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

    makeMove(index, "X");

    if(checkGameOver("X")) return;

    setTimeout(computerMove, 500);
}

function computerMove() {
    if(!running) return;

    let difficulty = difficultySelect.value;
    let move;

    if(difficulty === "hard") {
        move = findBestMove();
    } else {
        move = randomMove();
    }

    makeMove(move, "O");
    checkGameOver("O");
}

function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
}

function randomMove() {
    let emptyCells = board
        .map((value, index) => value === "" ? index : null)
        .filter(value => value !== null);

    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function findBestMove() {
    // Try to win
    for(let condition of winConditions) {
        let [a,b,c] = condition;
        let values = [board[a], board[b], board[c]];

        if(values.filter(v => v === "O").length === 2 && values.includes("")) {
            return condition[values.indexOf("")];
        }
    }

    // Block player
    for(let condition of winConditions) {
        let [a,b,c] = condition;
        let values = [board[a], board[b], board[c]];

        if(values.filter(v => v === "X").length === 2 && values.includes("")) {
            return condition[values.indexOf("")];
        }
    }

    return randomMove();
}

function checkGameOver(player) {
    for(let condition of winConditions) {
        const [a,b,c] = condition;

        if(board[a] === player && board[b] === player && board[c] === player) {
            statusText.textContent = `${player} Wins!`;
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

    if(!board.includes("")) {
        statusText.textContent = "Draw!";
        running = false;
        return true;
    }

    return false;
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    running = true;
    statusText.textContent = "Player X's Turn";
    cells.forEach(cell => cell.textContent = "");
}
