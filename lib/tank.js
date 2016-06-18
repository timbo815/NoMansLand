var Missile = require('./missile.js');
var Util = require('./util.js');

var Tank = function (pos, barrelAngle, barrelLength, game, player) {
  this.pos = pos;
  this.midPoint = [pos[0] + 20, pos[1] + 20];
  this.game = game;
  this.barrelAngle = barrelAngle;
  this.barrelLength = barrelLength;
  this.player = player;
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
};

Tank.prototype.barrelUp = function () {
    this.barrelAngle -= 5;
};

Tank.prototype.barrelDown = function () {
    this.barrelAngle += 5;
};

Tank.prototype.fireMissile = function () {
  var missilePosX = this.barrelTipPos[0];
  var missilePosY = this.barrelTipPos[1];
  var initialVel = [];
  var color = "";
  if (this.player === "Player One") {
    initialVel = [missilePosX - (this.pos[0] + 20), missilePosY - (this.pos[1] + 20)];
    color = "#B0171F";
  } else {
    initialVel = [(missilePosX - (this.pos[0] + 20)), missilePosY - (this.pos[1] + 20)];
    color = "#F7E345";
  }

  var missile = new Missile({
    pos: [missilePosX, missilePosY],
    vel: [initialVel[0] / 3, initialVel[1] / 3],
    acc: 0.10,
    radius: [5],
    color: color,
    game: this.game
  });
  this.game.addMissile(missile);
};

module.exports = Tank;
