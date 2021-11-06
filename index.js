"use strict"

const rollBtn = document.querySelector('#rollBtn');
const resetBtn = document.querySelector('#resetBtn');
const player1Dice = document.querySelector('#player1Dice');
const player2Dice = document.querySelector('#player2Dice');
const player1Scoreboard = document.querySelector('#player1Scoreboard');
const player2Scoreboard = document.querySelector('#player2Scoreboard');
const message = document.querySelector('#message');

let player1Turn = true;
let player2Turn = false;
let player1Score = 0;
let player2Score = 0;


rollBtn.addEventListener('click', rollDice);
resetBtn.addEventListener('click', resetGame);

function rollDice() {
   let randomNumber = Math.floor(Math.random() * 6 + 1);

   if (player1Turn) {
      player1Dice.innerHTML = randomNumber;
      player1Turn = false;
      player2Turn = true;
      player1Score += randomNumber;
      player1Scoreboard.innerHTML = player1Score;
      message.innerHTML = "Player 2 Turn";
      player1Dice.classList.remove('active');
      player2Dice.classList.add('active');
   } else if (player2Turn) {
      player2Dice.innerHTML = randomNumber;
      player1Turn = true;
      player2Turn = false;
      player2Score += randomNumber;
      player2Scoreboard.innerHTML = player2Score;
      message.innerHTML = "Player 1 Turn";
      player2Dice.classList.remove('active');
      player1Dice.classList.add('active');
   }

   pickWinner();
}

function pickWinner() {
   if (player1Score >= 20) {
      rollBtn.style.display = "none";
      resetBtn.style.display = "block";
      message.innerHTML = "Player 1 has won! 🎉";
      player2Dice.classList.remove('active');
      player1Dice.classList.remove('active');
   } else if (player2Score >= 20) {
      rollBtn.style.display = "none";
      resetBtn.style.display = "block";
      message.innerHTML = "Player 2 has won! 🥳";
      player2Dice.classList.remove('active');
      player1Dice.classList.remove('active');
   }
}

function resetGame() {
   player1Turn = true;
   player2Turn = false;
   player1Score = 0;
   player2Score = 0;
   message.innerHTML = "Player 1 Turn";
   player1Dice.classList.add('active');
   player1Scoreboard.innerHTML = player1Score;
   player2Scoreboard.innerHTML = player2Score;
   player1Dice.innerHTML = "-";
   player2Dice.innerHTML = "-";
   rollBtn.style.display = "block";
   resetBtn.style.display = "none";
}