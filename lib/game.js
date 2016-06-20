var Tank = require('./tank.js');
var Util = require('./util.js');
var Para = require('./para.js');
var AIPlayer = require('./ai_player.js');

var Game = function (type) {
  this.background = new Image();
  this.background.src = 'images/background.png';
  this.playerOneTank = new Tank([100, Game.DIM_Y - 105], 45, 35, 0, this, "Player One");
  this.playerTwoTank = new Tank([875, Game.DIM_Y - 110], 135, 35, 0, this, "Player Two");
  this.missiles = [];
  this.isWon = false;
  this.winner = "";
  this.paras = [];

  if (type === "computer") {
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

  ctx.drawImage(this.background, 0, 0, Game.DIM_X, Game.DIM_Y );

  this.drawTitle(ctx);
  this.playerOneTank.draw(ctx);
  this.playerTwoTank.draw(ctx);
  this.drawBarrelPowers(ctx);
  this.paras.forEach(function (para){
    para.draw(ctx);
  });
  this.missiles.forEach(function (missile) {
    missile.draw(ctx);
  });
};

Game.prototype.drawTitle = function (ctx) {
  ctx.font = "48px sans-serif";
  ctx.fillStyle = "#BD1E06";
  ctx.fillText("NoMansLand", 350, 100);
};

Game.prototype.drawBarrelPowers = function (ctx) {
  ctx.font = "24px sans-serif";
  ctx.fillStyle = "#000000";
  ctx.fillText("Power: " + this.playerOneTank.powerDisplay.toString(), 85, 600);

  ctx.font = "24px sans-serif";
  ctx.fillStyle = "#000000";
  ctx.fillText("Power: " + this.playerTwoTank.powerDisplay.toString(), 850, 600);
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
  } else if (pos[1] > Game.DIM_Y - 70 || pos[1] < 0) {
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
