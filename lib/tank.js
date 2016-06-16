var Missile = require('./missile.js');

var Tank = function (pos, barrelHeight, game) {
  this.pos = pos;
  this.barrelHeight = barrelHeight;
  this.game = game;
};

Tank.prototype.draw = function (ctx) {
  ctx.fillStyle = "#666666";
  ctx.fillRect(this.pos[0], this.pos[1], 80, 40);

  var midPoint = (this.pos[0] + 40);
  var xBarrel = this.pos[0] < 500 ? (midPoint + 30) : (midPoint - 30);
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.moveTo(midPoint, 700);
  ctx.lineTo(xBarrel, 700 - this.barrelHeight);
  ctx.closePath();
  ctx.stroke();
};

Tank.prototype.barrelUp = function () {
  this.barrelHeight -= 10;
};

Tank.prototype.barrelDown = function () {
  this.barrelHeight += 10;
};

Tank.prototype.fireMissile = function () {
  // var norm = Util.norm(this.vel);

  // if (norm == 0) {
  //   // Can't fire unless moving.
  //   return;
  // }
  //
  // var relVel = Util.scale(
  //   Util.dir(this.vel),
  //   Missile.SPEED
  // );

  // var missileVel = [
  //   relVel[0] + this.vel[0], relVel[1] + this.vel[1]
  // ];

  var missile = new Missile({
    pos: this.pos,
    vel: [10, 10],
    radius: [10],
    color: "#505050",
    game: this.game
  });

  this.game.add(missile);
};

module.exports = Tank;
