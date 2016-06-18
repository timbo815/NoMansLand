var Game = require('./game.js');

var GameView = function (game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.winner = null;
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
      case 87:
      e.preventDefault();
      this.playerOneTank.barrelUp();
      break;

      case 83:
      e.preventDefault();
      this.playerOneTank.barrelDown();
      break;

      case 68:
      e.preventDefault();
      // if (this.game.missile !== null) {
      //   return;
      // }
      this.playerOneTank.fireMissile();
      break;

      case 40:
      e.preventDefault();
      this.playerTwoTank.barrelUp();
      break;

      case 38:
      e.preventDefault();
      this.playerTwoTank.barrelDown();
      break;

      case 37:
      e.preventDefault();
      this.playerTwoTank.fireMissile();
      break;
    }
};

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  this.game.addParas();
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function () {
  if (this.game.isWon === false) {
    this.game.draw(this.ctx);
    this.game.missiles.forEach(function (missile) {
      missile.move();
      missile.game.checkForHit();
    });

    this.game.paras.forEach(function (para) {
      para.move();
    });
    requestAnimationFrame(this.animate.bind(this));
  } else {
    var winner = this.game.currentPlayer;
    setTimeout(function() {
      this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      this.ctx.fillStyle = "#000000";
      this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
      this.ctx.font = "48px sans-serif";
      this.ctx.fillStyle = "#50C878";
      this.ctx.fillText(this.game.winner.toString() + " Wins!", 200, 400);
    }.bind(this), 2000);
  }
};

module.exports = GameView;
