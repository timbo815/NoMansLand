var Util = require('./util.js');

var Missile = function (options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.acc = options.acc;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
};

Missile.RADIUS = 2;
Missile.SPEED = 15;

Missile.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  );

  ctx.fill();
};

Missile.prototype.move = function () {
    this.vel[1] += this.acc;
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.checkParaHits();
    if (this.game.isOutOfBounds(this.pos)) {
      this.remove();
      this.game.switchPlayers();
    }
};

Missile.prototype.checkParaHits = function () {
  var self = this;
  this.game.paras.forEach(function (para) {
    if (Util.dist(para.pos, self.pos) < 40) {
      self.game.removePara(para);
      self.remove();
      self.game.switchPlayers();
    }
  });
};

Missile.prototype.remove = function () {
  this.game.missile = null;
};

module.exports = Missile;
