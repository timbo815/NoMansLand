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
      this.playerOneTank.fireMissile();
      break;

      case 81:
      e.preventDefault();
      this.playerOneTank.addBarrelPower();
      break;

      case 65:
      e.preventDefault();
      this.playerOneTank.decreaseBarrelPower();
      break;

      case 40:
      e.preventDefault();
      this.playerTwoTank.barrelUp();
      break;

      case 38:
      e.preventDefault();
      this.playerTwoTank.barrelDown();
      break;

      case 188:
      e.preventDefault();
      this.playerTwoTank.addBarrelPower();
      break;

      case 190:
      e.preventDefault();
      this.playerTwoTank.decreaseBarrelPower();
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
      this.ctx.font = "80px sans-serif";
      this.ctx.fillStyle = "#50C878";
      this.ctx.fillText(this.game.winner.toString() + " Wins!", 200, 400);
    }.bind(this), 2000);
  }
};

GameView.prototype.startAIGame = function () {
  this.bindAIKeyHandlers();
  this.game.addParas();
  requestAnimationFrame(this.animateAI.bind(this));
};

GameView.prototype.bindAIKeyHandlers = function () {
  document.addEventListener("keydown", this.handleAIKeyEvent.bind(this));
};

GameView.prototype.handleAIKeyEvent = function (e) {
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
      this.playerOneTank.fireMissile();
      break;
    }
  };

GameView.prototype.animateAI = function () {
  if (this.game.isWon === false) {
    this.game.draw(this.ctx);
    this.game.missiles.forEach(function (missile) {
      missile.move();
      missile.game.checkForHit();
    });

    this.game.paras.forEach(function (para) {
      para.move();
    });

    setInterval(function () {
      this.game.AIPlayer.move();
    }.bind(this), 300);

    setInterval(function () {
      this.game.AIPlayer.fire();
    }.bind(this), 300);

    setInterval(function () {
      this.game.AIPlayer.increasePower();
    }.bind(this), 4500);

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
