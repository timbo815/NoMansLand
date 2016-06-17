var Game = require('./game.js');

var GameView = function (game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.playerOneTank = game.playerOneTank;
  this.playerTwoTank = game.playerTwoTank;
};


GameView.prototype.bindKeyHandlers = function () {
  document.addEventListener("keydown", this.handleKeyEvent.bind(this));
};

GameView.prototype.handleKeyEvent = function (e) {
  var currentTank = null;
  if (this.game.currentPlayer === "Player One") {
    currentTank = this.playerOneTank;
  } else {
    currentTank = this.playerTwoTank;
  }
    switch (e.keyCode) {
      case 40:
      e.preventDefault();
      currentTank.barrelUp();
      break;

      case 38:
      e.preventDefault();
      currentTank.barrelDown();
      break;

      case 32:
      e.preventDefault();
      if (this.game.missile !== null) {
        return;
      }
      currentTank.fireMissile();
      break;
    }
};

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function () {
  if (this.game.isWon === false) {
    this.game.draw(this.ctx);
    if (this.game.missile) {
      this.game.missile.move();
      this.game.checkForHit();
    }
    requestAnimationFrame(this.animate.bind(this));
  } else {
    var winner = this.game.currentPlayer;
    setTimeout(function() {
      this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      this.ctx.fillStyle = "#000000";
      this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
      this.ctx.font = "48px sans-serif";
      this.ctx.fillStyle = "#00ff00";
      this.ctx.fillText(winner.toString() + " Wins!", 350, 400);
    }.bind(this), 2000);
  }
};

module.exports = GameView;
