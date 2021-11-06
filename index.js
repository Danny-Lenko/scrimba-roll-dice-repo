"use strict";

const player1Dice = document.getElementById('player1Dice');
const player2Dice = document.getElementById('player2Dice');
const player1Scoreboard = document.getElementById('player1Scoreboard');
const player2Scoreboard = document.getElementById('player2Scoreboard');
const message = document.getElementById('message');
const rollBtn = document.getElementById('rollBtn');
const resetBtn = document.getElementById('resetBtn');

let player1Score = 0;
let player2Score = 0;
let randomNumber = 0;
let player1Turn = true;
let player2Turn = false;

rollBtn.addEventListener('click', function() {
   rollDice()



   if (player1Score >= 20) {
      message.textContent = "Player 1 has won! 🥳"
      rollBtn.style.display = "none";
      resetBtn.style.display = "block";
      player2Dice.classList.remove("active");
     } else if (player2Score >= 20) {
      message.textContent = "Player 2 has won! 🎉"
      rollBtn.style.display = "none";
      resetBtn.style.display = "block";
      player1Dice.classList.remove("active");
     }

})

resetBtn.addEventListener('click', function() {
   player1Score = 0;
   player2Score = 0;
   randomNumber = 0;
   player1Turn = true;
   player2Turn = false;
   rollBtn.style.display = "block";
   resetBtn.style.display = "none";
   player1Dice.innerHTML = "-";
   player2Dice.innerHTML = "-";
   player1Scoreboard.innerHTML = player1Score;
   player2Scoreboard.innerHTML = player2Score;
   player1Dice.classList.add("active");
   player2Dice.classList.remove("active");
   message.innerHTML = "Player 1 Turn";
})

function rollDice() {
   randomNumber = Math.floor(Math.random() * 6 + 1);

   if (player1Turn) {
      message.innerHTML = "Player 2 Turn";
      player2Dice.classList.add("active");
      player1Dice.classList.remove("active");
      player1Dice.innerHTML = randomNumber;
      player1Score += randomNumber;
      player2Turn = true;
      player1Turn = false;
      player1Scoreboard.innerHTML = player1Score;
   } else if (player2Turn) {
      message.innerHTML = "Player 1 Turn";
      player1Dice.classList.add("active");
      player2Dice.classList.remove("active");
      player2Dice.innerHTML = randomNumber;
      player2Score += randomNumber;
      player1Turn = true;
      player2Turn = false;
      player2Scoreboard.innerHTML = player2Score;
   }
   
}