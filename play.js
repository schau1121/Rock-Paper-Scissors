let userScore = 0;
let cpuScore = 0;
let roundWinner = "";
let roundMessage = "";
let cpuMove = "";
let userMove = "";

const body = document.querySelector("body");
const buttons = document.querySelectorAll(".rps-btn");
const scoreboard = document.querySelector(".scoreboard");
const message = document.querySelector(".msg")
const winner_message = document.getElementById("end-msg-winner");
const overlay = document.getElementById("overlay");
const close_overlay_btn = document.getElementById("close-overlay");
const replay_btn = document.getElementById("replay-btn");
const player_score = document.querySelector("#player-score");
const cpu_score = document.querySelector("#cpu-score");

//Math.random() is multiplied by 3 since .random() returns a value
//between [0,1), so we should never encounter a value of 3
function computerPlay() {
    const moves = ["rock", "paper", "scissors"];
    let rand = Math.floor(Math.random() * 3);
    return moves[rand];
}

//returns an object with two values: an output string and an integer
//which represents which player won the game
//0 indicates the player won, 1 indicates the computer won
//2 represents a tie
function playRound(playerSelection, computerSelection) {
    switch(playerSelection) {
        case "rock":
            if(computerSelection === "scissors") {
                return ["You win! Rock beats Scissors", 0];
            } else if(computerSelection === "paper") {
                return ["You lose! Paper beats Rock", 1];
            } else {
                return ["It's a tie!", 2];
            }
            break;
        case "paper":
            if(computerSelection === "rock") {
                return ["You win! Paper beats Rock", 0];
            } else if(computerSelection === "scissors") {
                return ["You lose! Scissors beats Paper", 1];
            } else {
                return ["It's a tie!", 2];
            }
            break;
        case "scissors":
            if(computerSelection === "paper") {
                return ["You win! Scissors beats Paper", 0];
            } else if(computerSelection === "rock") {
                return ["You lose! Rock beats Scissors", 1];
            } else {
                return ["It's a tie!", 2];
            }
            break;
        default:
            return ["Error: Unexpected player input", 2];
    }
}

function updateScore(userInput) {
    console.log("updateScore called");
    cpuMove = computerPlay();
    userMove = userInput;

    let result = playRound(userMove, cpuMove);
    roundMessage = result[0];
    if(result[1] === 0) {
        roundWinner = "Player";
        userScore++;
    } else if(result[1] === 1) {
        roundWinner = "Computer";
        cpuScore++;
    } else {
        roundWinner = "Tie";
    }
}

function updateScoreBoard() {
    //update scoreboard with round winner and new scores
    player_score.childNodes[0].nodeValue = `Player: ${userScore}`;
    cpu_score.childNodes[0].nodeValue = `Computer: ${cpuScore}`;
    message.textContent = roundMessage;

    updateMoveSelection();
}

function updateMoveSelection() {
    switch(userMove) {
        case "rock":
            player_score.childNodes[1].textContent = "✊";
            break;
        case "paper":
            player_score.childNodes[1].textContent = "✋";
            break;
        case "scissors":
            player_score.childNodes[1].textContent = "✌";
            break;
    }

    switch(cpuMove) {
        case "rock":
            cpu_score.childNodes[1].textContent = "✊";
            break;
        case "paper":
            cpu_score.childNodes[1].textContent = "✋";
            break;
        case "scissors":
            cpu_score.childNodes[1].textContent = "✌";
            break;
    }
}

function gameIsOver() {
    return (userScore === 5 || cpuScore === 5);
}

//want to set overlay with winner message and replay button
function setFinalMessage() {
    overlay.style.display = "flex";
    winner_message.textContent = (userScore === 5) ? "You won!!!" : "You lost...";
}

function removeModal() {
    overlay.style.display = "none";
}

function replay() {
    removeModal();
    message.textContent = "";
    userScore = 0;
    cpuScore = 0;
}

function handleClick(button_id) {
    if(gameIsOver()) return;

    updateScore(button_id);
    updateScoreBoard();
    
    if(gameIsOver()) {
        console.log("Game Over");
        setFinalMessage();
    }
}

buttons.forEach(button => button.addEventListener("click", e =>{
    handleClick(e.target.id);
}));
close_overlay_btn.onclick = () => {
    removeModal();
};
replay_btn.onclick = () => {
    replay();
};
