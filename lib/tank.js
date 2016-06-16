var Tank = function (pos, barrelHeight) {
  this.pos = pos;
  this.barrelHeight = barrelHeight;
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

module.exports = Tank;
