var Tank = require('./tank.js');
var Util = require('./util.js');
var Para = require('./para.js');
var AIPlayer = require('./ai_player.js');

var Game = function (type) {
  if (type === "human") {
    this.playerOneTank = new Tank([100, Game.DIM_Y - 125], 45, 35, this, "Player One");
    this.playerTwoTank = new Tank([800, Game.DIM_Y - 125], 135, 35, this, "Player Two");
    this.missiles = [];
    this.isWon = false;
    this.winner = "";
    this.paras = [];
  } else if (type === "computer") {
    this.playerOneTank = new Tank([100, Game.DIM_Y - 125], 45, 35, this, "Player One");
    this.playerTwoTank = new Tank([800, Game.DIM_Y - 125], 135, 35, this, "Player Two");
    this.missiles = [];
    this.isWon = false;
    this.winner = "";
    this.paras = [];
    this.AIPlayer = new AIPlayer(this.playerTwoTank);
  }
};

Game.BG_COLOR = "#4785F4";
Game.DIM_X = 1000;
Game.DIM_Y = 620;

Game.prototype.addParas = function () {
  setInterval(function () {
    this.paras.push(new Para(this));
  }.bind(this), 300);
};

Game.prototype.addMissile = function(missile) {
  this.missiles.push(missile);
};

Game.prototype.draw = function (ctx) {

  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  ctx.fillStyle = "#50C878";
  ctx.fillRect(0, Game.DIM_Y - 100, Game.DIM_X, 100);

  this.drawTitle(ctx);
  this.playerOneTank.draw(ctx);
  this.playerTwoTank.draw(ctx);
  this.paras.forEach(function (para){
    para.draw(ctx);
  });
  this.missiles.forEach(function (missile) {
    missile.draw(ctx);
  });
};

Game.prototype.drawTitle = function(ctx) {
  ctx.font = "48px sans-serif";
  ctx.fillStyle = "#BD1E06";
  ctx.fillText("NoMansLand", 350, 100);
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
  } else if (pos[1] > Game.DIM_Y - 85 || pos[1] < 0) {
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

  var self = this;
  this.missiles.forEach(function (missile) {
    if (Util.dist(missile.pos, self.playerOneTank.midPoint) < 20) {
      self.handleHit("Player Two");
    } else if (Util.dist(missile.pos, self.playerTwoTank.midPoint) < 20) {
      self.handleHit("Player One");
    }
  });
};

Game.prototype.handleHit = function (winner) {
  this.isWon = true;
  this.winner = winner;
};


Game.prototype.removeMissile = function (missile) {
  this.missiles.splice(this.missiles.indexOf(missile), 1);
};

Game.prototype.removePara = function (para) {
  this.paras.splice(this.paras.indexOf(para), 1);
};

module.exports = Game;
