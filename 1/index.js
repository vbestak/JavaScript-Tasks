const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";
const PLAYER = "player";
const COMPUTER = "computer";

const rock_element = document.querySelector("#rock");
const paper_element = document.querySelector("#paper");
const scissors_element = document.querySelector("#scissors");

const score_element = document.querySelector("#score");
const info_element = document.querySelector("#info");
const result_element = document.querySelector("#result");

let score = [];

score[PLAYER] = 0;
score[COMPUTER] = 0;
score["draw"] = 0;

rock_element.addEventListener("click", () => {
  playGame(ROCK);
});

paper_element.addEventListener("click", () => {
  playGame(PAPER);
});

scissors_element.addEventListener("click", () => {
  playGame(SCISSORS);
});

function getMove(k) {
  switch (k) {
    case 1:
      return ROCK;
    case 2:
      return PAPER;
    case 3:
      return SCISSORS;
    default:
      return -1;
  }
}

function getRandomMove() {
  return getMove(Math.ceil(Math.random() * 3));
}

function determineWinner(player, computer) {
  if (player === computer) return "draw";

  if (player === ROCK) {
    return computer === PAPER ? COMPUTER : PLAYER;
  } else if (player === PAPER) {
    return computer === SCISSORS ? COMPUTER : PLAYER;
  } else if (player === SCISSORS) {
    return computer === ROCK ? COMPUTER : PLAYER;
  } else {
    return "invalid input";
  }
}

function playGame(playerMove) {
  let computerMove = getRandomMove();
  let winner = determineWinner(playerMove, computerMove);

  score[winner] += 1;

  info_element.textContent = `Player: ${playerMove} vs Computer: ${computerMove} `;
  result_element.textContent = `WINNER: ${winner}`;
  score_element.textContent = `Current score: Player[${score[PLAYER]}] Computer[${score[COMPUTER]}]`;
}