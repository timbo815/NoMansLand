var AIPlayer = function (tank) {
  this.tank = tank;
};

AIPlayer.prototype.move = function () {
  if (this.tank.barrelAngle < 195) {
    this.tank.barrelDown();
  }
};

AIPlayer.prototype.fire = function () {
  if (this.tank.barrelAngle > 170) {
    this.tank.fireMissile();
  }
};

module.exports = AIPlayer;
