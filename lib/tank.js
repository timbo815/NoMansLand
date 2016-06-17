var Missile = require('./missile.js');
var Util = require('./util.js');

var Tank = function (pos, barrelAngle, barrelLength, game) {
  this.pos = pos;
  this.midPoint = [pos[0] + 20, pos[1] + 20];
  // this.barrelX = barrelX;
  // this.barrelY = barrelY;
  this.game = game;
  this.barrelAngle = barrelAngle;
  this.barrelLength = barrelLength;
  // this.barrelTipPos = [0, 0];
};

Tank.prototype.draw = function (ctx) {
  ctx.fillStyle = "#666666";
  ctx.fillRect(this.pos[0], this.pos[1], 40, 40);

  var midPoint = [(this.pos[0] + 20), (this.pos[1] + 20)];
  var cx = midPoint[0];
  var cy = midPoint[1];
  ctx.fillStyle = "#000000";

  var barrelAngleRadians = (this.barrelAngle * Math.PI / 180);

  var pos = Util.lineToAngle(cx, cy, this.barrelLength, barrelAngleRadians);
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(pos.x, pos.y);
  this.barrelTipPos = [pos.x, pos.y];
  ctx.lineWidth = 3;
  ctx.closePath();
  ctx.stroke();

  // ctx.beginPath();
  // ctx.moveTo(midPoint, 520);
  // ctx.lineTo(this.barrelX, 520 - this.barrelY);
  // ctx.closePath();
  // ctx.stroke();
};

Tank.prototype.barrelUp = function () {
  if (this.game.currentPlayer === "Player One") {
    this.barrelAngle += 5;
  } else {
    this.barrelAngle -= 5;
  }
};

Tank.prototype.barrelDown = function () {
  if (this.game.currentPlayer === "Player One") {
    this.barrelAngle -= 5;
  } else {
    this.barrelAngle += 5;
  }
};

Tank.prototype.fireMissile = function () {

  // var barrelVel = [
  //   this.barrelX - (this.pos[0] + 40), -this.barrelY
  // ];
  // var norm = Util.norm(this.vel);
  // var norm = Util.norm(barrelVel);

  // if (norm == 0) {
  //   // Can't fire unless moving.
  //   return;
  // }
  //
  // var relVel = Util.scale(
  //   // Util.dir(this.vel),
  //   Util.dir(barrelVel),
  //   Missile.SPEED
  // );
  // var missileVel = [];
  // if (this.game.currentPlayer === "Player One") {
  //   missileVel = [
  //     (relVel[0] + this.barrelX) / 20, (relVel[1] - this.barrelY) / 6
  //   ];
  // } else {
  //   missileVel = [
  //     -(relVel[0] + this.barrelX) / 100, (relVel[1] - this.barrelY) / 6
  //   ];
  // }
  // var missileVel = [
  //   this.barrelX - this.pos[0], this.barrelY - this.pos[1]
  // ];
  var missilePosX = this.barrelTipPos[0];
  var missilePosY = this.barrelTipPos[1];
  var initialVel = [];
  if (this.game.currentPlayer === "Player One") {
    initialVel = [missilePosX - (this.pos[0] + 20), missilePosY - (this.pos[1] + 20)];
  } else {
    initialVel = [(missilePosX - (this.pos[0] + 20)), missilePosY - (this.pos[1] + 20)];
  }

  var missile = new Missile({
    pos: [missilePosX, missilePosY],
    vel: [initialVel[0] / 3, initialVel[1] / 3],
    acc: 0.10,
    radius: [5],
    color: "#B0171F",
    game: this.game
  });
  this.game.add(missile);
};

module.exports = Tank;
