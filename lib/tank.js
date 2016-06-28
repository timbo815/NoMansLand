var Missile = require('./missile.js');
var Util = require('./util.js');

var Tank = function (pos, barrelAngle, barrelLength, barrelPower, game, player) {
  this.pos = pos;
  this.midPoint = [pos[0] + 20, pos[1] + 20];
  this.game = game;
  this.barrelAngle = barrelAngle;
  this.barrelLength = barrelLength;
  this.barrelPower = barrelPower;
  this.powerDisplay = 1;
  this.player = player;

  if (this.player === "Player One") {
    this.tankImage = new Image();
    this.tankImage.src = 'images/tank10.png';
  } else {
    this.tankImage = new Image();
    this.tankImage.src = 'images/tank9.png';
  }
};

Tank.prototype.draw = function (ctx) {

  ctx.drawImage(this.tankImage, this.pos[0], this.pos[1], 60, 60 );

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
  this.barrelAngle -= 1;
};

Tank.prototype.barrelDown = function () {
  this.barrelAngle += 1;
};

Tank.prototype.addBarrelPower = function () {
  if (this.barrelPower >= 0.40) {
    return;
  }
  this.barrelPower += 0.05;
  this.powerDisplay += 1;
};

Tank.prototype.decreaseBarrelPower = function () {
  if (this.barrelPower <= 0.05) {
    return;
  }
  this.barrelPower -= 0.05;
  this.powerDisplay -= 1;
};

Tank.prototype.fireMissile = function () {
  var missilePosX = this.barrelTipPos[0];
  var missilePosY = this.barrelTipPos[1];
  var initialVel = [];
  var color = "";
  var acc = 0.5 - this.barrelPower;

  if (this.player === "Player One") {
    initialVel = [missilePosX - (this.pos[0] + 20), missilePosY - (this.pos[1] + 20)];
    color = "#386e01";
  } else {
    initialVel = [(missilePosX - (this.pos[0] + 20)), missilePosY - (this.pos[1] + 20)];
    color = "#B0171F";
  }

  var missile = new Missile({
    pos: [missilePosX, missilePosY],
    vel: [initialVel[0] / 3, initialVel[1] / 3],
    acc: acc,
    radius: [5],
    color: color,
    game: this.game
  });
  this.game.addMissile(missile);
};

module.exports = Tank;
