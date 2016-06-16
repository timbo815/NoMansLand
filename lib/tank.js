var Missile = require('./missile.js');
var Util = require('./util.js');

var Tank = function (pos, barrelX, barrelY, game) {
  this.pos = pos;
  this.barrelX = barrelX;
  this.barrelY = barrelY;
  this.game = game;
};

Tank.prototype.draw = function (ctx) {
  ctx.fillStyle = "#666666";
  ctx.fillRect(this.pos[0], this.pos[1], 80, 40);

  var midPoint = (this.pos[0] + 40);

  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.moveTo(midPoint, 700);
  ctx.lineTo(this.barrelX, 700 - this.barrelY);
  ctx.closePath();
  ctx.stroke();
};

Tank.prototype.barrelUp = function () {
  this.barrelY -= 10;
};

Tank.prototype.barrelDown = function () {
  this.barrelY += 10;
};

Tank.prototype.fireMissile = function () {
  var barrelVel = [
    this.barrelX - this.pos[0] + 40, -this.barrelY
  ];
  // var norm = Util.norm(this.vel);
  var norm = Util.norm(barrelVel);

  // if (norm == 0) {
  //   // Can't fire unless moving.
  //   return;
  // }
  //
  var relVel = Util.scale(
    // Util.dir(this.vel),
    Util.dir(barrelVel),
    Missile.SPEED
  );
  var missileVel = [
    (relVel[0] + this.barrelX) / 20, (relVel[1] - this.barrelY) / 20
  ];
  // var missileVel = [
  //   this.barrelX - this.pos[0], this.barrelY - this.pos[1]
  // ];

  var missile = new Missile({
    pos: [this.barrelX, 700 - this.barrelY],
    vel: missileVel,
    acc: 0.15,
    radius: [5],
    color: "#B0171F",
    game: this.game
  });
  this.game.add(missile);
};

module.exports = Tank;
