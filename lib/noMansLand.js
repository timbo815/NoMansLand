var Game = require("./game.js");
var GameView = require("./game_view.js");


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("new-game").addEventListener("click", function () {
    var canvasEl = document.getElementsByTagName("canvas")[0];
    canvasEl.width = Game.DIM_X;
    canvasEl.height = Game.DIM_Y;
    var ctx = canvasEl.getContext('2d');
    var game = new Game();
    new GameView(game, ctx).start();
  });
});





// var canvasEl = document.getElementsByTagName("canvas")[0];
// canvasEl.width = Game.DIM_X;
// canvasEl.height = Game.DIM_Y;
//
// var ctx = canvasEl.getContext('2d');
// var game = new Game();
// new GameView(game, ctx).start();
