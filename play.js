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
                return ["You Win! Rock beats Scissors", 0];
            } else if(computerSelection === "paper") {
                return ["You Lose! Paper beats Rock", 1];
            } else {
                return ["It's a Tie!", 2];
            }
            break;
        case "paper":
            if(computerSelection === "rock") {
                return ["You Win! Paper beats Rock", 0];
            } else if(computerSelection === "scissors") {
                return ["You Lose! Scissors beats Paper", 1];
            } else {
                return ["It's a Tie!", 2];
            }
            break;
        case "scissors":
            if(computerSelection === "paper") {
                return ["You Win! Scissors beats Paper", 0];
            } else if(computerSelection === "rock") {
                return ["You Lose! Rock beats Scissors", 1];
            } else {
                return ["It's a Tie!", 2];
            }
            break;
        default:
            return ["Error: Unexpected player input", 2];
    }
}

function game() {
    //let userInput = prompt("Rock, paper, or scissors? (Enter 'Q' if you would like to end the game)");
    //userInput = userInput.toLowerCase();

    let userScore = 0;
    let cpuScore = 0;
    let numRounds = 0;

    while(numRounds < 5) {
        let cpuInput = computerPlay();
        let result = playRound(userInput, cpuInput);
        
        if(result[1] === 0) {
            userScore++;
        }
        else if(result[1] === 1) {
            cpuScore++;
        }
        
        console.log(result[0]);
        
        userInput = prompt("Rock, paper, or scissors? (Enter 'Q' if you would like to end the game)");
        userInput = userInput.toLowerCase();
        numRounds++;
    }
    let output = "Game has ended!\nYour Score: " + userScore + "\nComputer Score: " + cpuScore;
    console.log(output);

    return null;
}