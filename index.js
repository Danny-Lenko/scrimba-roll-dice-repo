"use strict"

window.onload = function() {
   document.querySelector('#rollBtn').addEventListener('click', controller.rollDice);
}

let view = {
   displayResult: function(player) {
      const dice = document.getElementsByClassName('dice');
      dice[player].innerHTML = model.players[player].dice;
   },

   displayScore: function(player) {
      const scoreboardList = document.getElementsByClassName('scoreboard');
      scoreboardList[player].innerHTML = model.players[player].score;
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
   }
};

let controller = {
   rollDice: function() {
      model.sumPlayerScore(0);
      view.displayResult(0);
      view.displayScore(0);
   }
};