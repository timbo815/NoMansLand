var Game = require("./game.js");
var GameView = require("./game_view.js");


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("new-game").addEventListener("click", function () {
    var canvasEl = document.getElementsByTagName("canvas")[0];
    canvasEl.width = Game.DIM_X;
    canvasEl.height = Game.DIM_Y;
    var ctx = canvasEl.getContext('2d');
    var game = new Game("human");
    new GameView(game, ctx).start();
  });
  document.getElementById("new-ai-game").addEventListener("click", function () {
    var canvasEl = document.getElementsByTagName("canvas")[0];
    canvasEl.width = Game.DIM_X;
    canvasEl.height = Game.DIM_Y;
    var ctx = canvasEl.getContext('2d');
    var game = new Game("computer");
    new GameView(game, ctx).startAIGame();
  });
});





// var canvasEl = document.getElementsByTagName("canvas")[0];
// canvasEl.width = Game.DIM_X;
// canvasEl.height = Game.DIM_Y;
//
// var ctx = canvasEl.getContext('2d');
// var game = new Game();
// new GameView(game, ctx).start();
