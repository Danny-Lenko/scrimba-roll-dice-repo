"use strict"

window.onload = function() {
   document.querySelector('#rollBtn').addEventListener('click', controller.rollDice);
   document.querySelector('#resetBtn').addEventListener('click', controller.resetGame);

   document.querySelector('#twoPlayersBtn').addEventListener('click', model.start2Players);
   document.querySelector('#threePlayersBtn').addEventListener('click', model.start3Players);
   document.querySelector('#fourPlayersBtn').addEventListener('click', model.start4Players);
   document.querySelector('#fivePlayersBtn').addEventListener('click', model.start5Players);
}

let view = {

   displayResult: function(player) {
      const diceList = document.getElementsByClassName('dice');
      diceList[player].innerHTML = model.players[player].dice;
      this.displayShade(diceList, player)
   },

   displayShade: function(list, player) {
      let nextPlayer = player + 1;
      for (let i = 0; i < model.players.length; i++) {
         list[i].removeAttribute('role');
      }
      if (nextPlayer < model.players.length) {
         list[nextPlayer].setAttribute('role', 'active');
      } else {
         list[0].setAttribute('role', 'active');
      }
   },

   displayScore: function(player) {
      const scoreboardList = document.getElementsByClassName('scoreboard');
      scoreboardList[player].innerHTML = model.players[player].score;
      this.displayMessage(playerTurn(), controller.roundNum);
   },

   displayMessage: function(playerNum, roundNum) {
      document.querySelector('#message').innerHTML = `Player ${playerNum} Turn`;
      document.querySelector('#roundEl').innerHTML = `Round # ${roundNum}`;
   },

   displayVictoryMessage: function(winner) {
      document.querySelector('#message').innerHTML = `Congrats! Player ${winner + 1} won!`;
   }
};

//
//    end of view object
//

let model = {
   players: [
      {score: 0, dice: 0},
      {score: 0, dice: 0}
   ],

   getRandomNum: function() {
      return Math.floor(Math.random() * 6 + 1);
   },

   sumPlayerScore: function(player) {
      let dice = this.getRandomNum();
      this.players[player].dice = dice;
      this.players[player].score += dice;
   },

   countPlayerTurn: function() {
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
   },

   checkScore: function() {
      for (let i = 0; i < this.players.length; i++) {
         let player = this.players[i];
         if (player.score >= 20) {
            return true;
         }
      }
      return false;
   },

   manageVictory: function() {
      const rollBtn = document.querySelector('#rollBtn');
      const resetBtn = document.querySelector('#resetBtn');
      let playerScores = collectScores();
      defineWinnerName(playerScores, checkWinner(playerScores));
      controller.changeButton(rollBtn, resetBtn);
   },

   // set up number of players

   start2Players: function() {
      document.querySelector('.overlay').style.display="none";
   }
};
let playerTurn = model.countPlayerTurn();

// 
//    end of model object
// 

let controller = {
   player: 0,
   clicks: 0,
   roundNum: 1,

   countClicks: function() {
      this.clicks++;
      this.manageClicks();
   },

   manageClicks: function() {
      let hitScore = model.checkScore();
      if (this.clicks === model.players.length && hitScore) {
         model.manageVictory();
      }
      if (this.clicks === model.players.length) {
         this.roundNum++;
         document.querySelector('#roundEl').innerHTML = `Round # ${this.roundNum}`;
         this.clicks = 0;
      }
   },

   rollDice: function() {
      model.sumPlayerScore(controller.player);
      view.displayResult(controller.player);
      view.displayScore(controller.player);
      controller.changePlayer();
      controller.countClicks();
   },

   changePlayer: function() {
      if (this.player < (model.players.length - 1)) {
         this.player++;
      } else {
         this.player = 0;
      }
   },

   changeButton: function(hideBtn, showBtn) {
      hideBtn.style.display = "none";
      showBtn.style.display = "block";
   },

   resetGame: function() {
      const scoreboardList = document.getElementsByClassName('scoreboard');
      const diceList = document.getElementsByClassName('dice');
      const rollBtn = document.querySelector('#rollBtn');
      const resetBtn = document.querySelector('#resetBtn');

      for (let i = 0; i < model.players.length; i++) {
         model.players[i].score = 0;
         scoreboardList[i].innerHTML = 0;
         diceList[i].innerHTML = `-`;
      }
      document.querySelector('#message').innerHTML = `Player 1 Turn`;
      document.querySelector('#roundEl').innerHTML = `Round # 1`;

      controller.clicks = 0;
      controller.roundNum = 1;
      controller.player = 0;
      controller.changeButton(resetBtn, rollBtn);
   }
};

function collectScores() {
   let playerScores = [];
   for (let i = 0; i < model.players.length; i++) {
      playerScores.push(model.players[i].score);
   }
   return playerScores;
}
function checkWinner(scores) {
   let bestScore = 0;
   for (let i = 0; i < scores.length; i++) {
      if (scores[i] > bestScore) {
         bestScore = scores[i];
      }
   }
   return bestScore;
}
function defineWinnerName(scores, best) {
   let winnerNumber = 0
   for (let i = 0; i < scores.length; i++) {
      if (best === scores[i]) {
         winnerNumber = i;
      }
   }
   view.displayVictoryMessage(winnerNumber);
}