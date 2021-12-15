"use strict"

function countPlayerTurn() {
   let playerNum = 1;
   function counter() {
      if (playerNum < model.players.length) {
         playerNum++;
      } else {
         playerNum = 1;
      }
      return playerNum;
   }
   return counter;
}
let playerTurn = countPlayerTurn();

window.onload = function() {
   document.querySelector('#rollBtn').addEventListener('click', controller.rollDice);
}

let view = {
   displayResult: function(player) {
      const dice = document.getElementsByClassName('dice');
      dice[player].innerHTML = model.players[player].dice;
      for (let i = 0; i < model.players.length; i++) {
         if (i === player) {
            dice[i + 1].setAttribute('class', 'active');
         }
      }
   },

   displayScore: function(player) {
      const scoreboardList = document.getElementsByClassName('scoreboard');
      scoreboardList[player].innerHTML = model.players[player].score;
      this.displayMessage(playerTurn());
   },

   displayMessage: function(playerNum) {
      document.querySelector('#message').innerHTML = `Player ${playerNum} Turn`;
   }
};

let model = {

   players: [
      {score: 0, turn: true, dice: 0},
      {score: 0, turn: false, dice: 0}
   ],

   getRandomNum: function() {
      return Math.floor(Math.random() * 6 + 1);
   },

   sumPlayerScore: function(player) {
      let dice = this.getRandomNum();
      this.players[player].dice = dice;
      this.players[player].score += dice;
   },
};

let controller = {
   player: 0,

   rollDice: function() {
      model.sumPlayerScore(controller.player);
      view.displayResult(controller.player);
      view.displayScore(controller.player);
      controller.changePlayer();
   },

   changePlayer: function() {
      if (this.player < (model.players.length - 1)) {
         this.player++;
      } else {
         this.player = 0;
      }
   }
};