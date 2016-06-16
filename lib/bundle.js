/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);
	var GameView = __webpack_require__(3);
	
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvasEl = document.getElementsByTagName("canvas")[0];
	  canvasEl.width = Game.DIM_X;
	  canvasEl.height = Game.DIM_Y;
	
	  var ctx = canvasEl.getContext('2d');
	  var game = new Game();
	  new GameView(game, ctx).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Tank = __webpack_require__(2);
	
	var Game = function () {
	  this.playerOneTank = new Tank([100, 675], 40);
	  this.playerTwoTank = new Tank([700, 675], 40);
	};
	
	Game.BG_COLOR = "#4785F4";
	Game.DIM_X = 1000;
	Game.DIM_Y = 800;
	
	Game.prototype.draw = function (ctx) {
	
	  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  ctx.fillStyle = Game.BG_COLOR;
	  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
	
	  ctx.fillStyle = "#50C878";
	  ctx.fillRect(0, 700, Game.DIM_X, 100);
	
	  this.playerOneTank.draw(ctx);
	  this.playerTwoTank.draw(ctx);
	};
	
	Game.prototype.handleUpKey = function () {
	  this.playerOneTank.barrelUp();
	};
	
	Game.prototype.handleDownKey = function () {
	  this.playerOneTank.barrelDown();
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map