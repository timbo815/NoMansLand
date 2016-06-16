var GameView = function (game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.playerOneTank = game.playerOneTank;
  this.playerTwoTank = game.playerTwoTank;
};


GameView.prototype.bindKeyHandlers = function () {
  document.addEventListener("keydown", this.handleKeyEvent.bind(this));
};

GameView.prototype.handleKeyEvent = function (e) {
    switch (e.keyCode) {
      case 83:
      this.playerOneTank.barrelUp();
      break;

      case 87:
      this.playerOneTank.barrelDown();
      break;
    }
};

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function () {
  this.game.draw(this.ctx);
  requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;
