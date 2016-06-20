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
    ctx.font = "48px sans-serif";
    ctx.fillStyle = "#BD1E06";
    ctx.fillText("NoMansLand", 350, 100);
  }, false);
  img.src = 'images/background.png';

  document.getElementById("new-game").addEventListener("click", function () {
    var game = new Game("human");
    new GameView(game, ctx).start();
  });
  document.getElementById("new-ai-game").addEventListener("click", function () {
    var game = new Game("computer");
    new GameView(game, ctx).startAIGame();
  });
});
