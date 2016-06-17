var Tank = require('./tank.js');
var Util = require('./util.js');

var Game = function () {
  this.playerOneTank = new Tank([100, Game.DIM_Y - 125], 45, 30, this);
  this.playerTwoTank = new Tank([800, Game.DIM_Y - 125], 45, 30, this);
  this.missile = null;
  this.currentPlayer = "Player One";
  this.isWon = false;
};

Game.BG_COLOR = "#4785F4";
Game.DIM_X = 1000;
Game.DIM_Y = 620;

Game.prototype.add = function(missile) {
  this.missile = missile;
};

// Game.prototype.promptMove = function () {
//
// };

Game.prototype.draw = function (ctx) {

  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  ctx.fillStyle = "#50C878";
  ctx.fillRect(0, Game.DIM_Y - 100, Game.DIM_X, 100);

  this.drawPlayerName(ctx);
  this.playerOneTank.draw(ctx);
  this.playerTwoTank.draw(ctx);
  if (this.missile) {
    this.missile.draw(ctx);
  }
};

Game.prototype.drawPlayerName = function (ctx) {
  if(this.currentPlayer) {
    ctx.font = "48px sans-serif";
    if (this.currentPlayer === "Player One") {
      ctx.fillText("Player One!", 350, 400);
    } else {
      ctx.fillText("Player Two!", 350, 400);
    }
  }
};

Game.prototype.handleUpKey = function () {
  this.playerOneTank.barrelUp();
};

Game.prototype.handleDownKey = function () {
  this.playerOneTank.barrelDown();
};

Game.prototype.isOutOfBounds = function (pos) {
  if (pos[0] > Game.DIM_X || pos[0] < 0) {
    return true;
  } else if (pos[1] > Game.DIM_Y || pos[1] < 0) {
      return true;
    }
};

Game.prototype.switchPlayers = function () {
  if (this.currentPlayer === "Player One") {
    this.currentPlayer = "Player Two";
  } else {
    this.currentPlayer = "Player One";
  }
};

Game.prototype.checkForHit = function () {
  if (this.missile === null) {
    return;
  }
  var otherPlayerTank = this.currentPlayer === "Player One" ? this.playerTwoTank : this.playerOneTank;
  if (Util.dist(this.missile.pos, otherPlayerTank.midPoint) < 20) {
    this.handleHit();
    this.missile = null;
  }
};

Game.prototype.handleHit = function () {
  this.isWon = true;
};

// Game.prototype.drawWinner = function (ctx) {
//   ctx.font = "48px sans-serif";
//   ctx.fillText("Player One Wins!", 350, 400);
// };

Game.prototype.remove = function (object) {
  this.missile = null;
};

module.exports = Game;
