var Tank = require('./tank.js');

var Game = function () {
  this.playerOneTank = new Tank([100, 675], 40);
  this.playerTwoTank = new Tank([700, 675], 40);
};

Game.BG_COLOR = "#4785F4";
Game.DIM_X = 1000;
Game.DIM_Y = 800;

Game.prototype.draw = function (ctx) {

  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  ctx.fillStyle = "#50C878";
  ctx.fillRect(0, 700, Game.DIM_X, 100);

  this.playerOneTank.draw(ctx);
  this.playerTwoTank.draw(ctx);
};

Game.prototype.handleUpKey = function () {
  this.playerOneTank.barrelUp();
};

Game.prototype.handleDownKey = function () {
  this.playerOneTank.barrelDown();
};

module.exports = Game;
