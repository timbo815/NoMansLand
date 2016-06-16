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
  var currentTank = null;
  if (this.game.currentPlayer === "playerOne") {
    currentTank = this.playerOneTank;
  } else {
    currentTank = this.playerTwoTank;
  }
    switch (e.keyCode) {
      case 83:
      currentTank.barrelUp();
      break;

      case 87:
      currentTank.barrelDown();
      break;

      case 32:
      if (this.game.missile !== null) {
        return;
      }
      currentTank.fireMissile();
      break;
    }
};

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function () {
  this.game.draw(this.ctx);
  // this.game.promptMove();
  if (this.game.missile) {
    this.game.missile.move();
  }
  requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;
