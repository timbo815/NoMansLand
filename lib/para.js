var Para = function (game) {
  var posX = Math.random() * 800;
  this.pos = [posX, 0];
  this.game = game;
};

Para.prototype.draw = function (ctx) {
  var img = new Image();
  img.src = "images/para.png";
  ctx.drawImage(img, this.pos[0], this.pos[1], 35, 35);
};

Para.prototype.move = function () {
  this.pos[1] += 1;
  if (this.game.isOutOfBounds(this.pos)) {
    this.game.removePara(this);
  }
};

module.exports = Para;
