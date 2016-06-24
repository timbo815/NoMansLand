var Game = require("./game.js");
var GameView = require("./game_view.js");


document.addEventListener("DOMContentLoaded", function () {
  var canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;
  var ctx = canvasEl.getContext('2d');
  var img = new Image();
  img.addEventListener("load", function() {
    ctx.drawImage(img, 0, 0, Game.DIM_X, Game.DIM_Y );
  }, false);
  img.src = 'images/background.png';

  document.getElementsByClassName("how-to-play")[0].click();

  document.getElementById("new-game").addEventListener("click", function () {
    var game = new Game("human");
    new GameView(game, ctx).start();
  });
  document.getElementById("new-ai-game").addEventListener("click", function () {
    var game = new Game("computer");
    new GameView(game, ctx).startAIGame();
  });
});
