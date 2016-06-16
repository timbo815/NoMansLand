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
	  this.playerOneTank = new Tank([100, 675], 40, this);
	  this.playerTwoTank = new Tank([700, 675], 40, this);
	  this.missile = null;
	};
	
	Game.BG_COLOR = "#4785F4";
	Game.DIM_X = 1000;
	Game.DIM_Y = 800;
	
	Game.prototype.add = function(missile) {
	  this.missile = missile;
	};
	
	Game.prototype.draw = function (ctx) {
	
	  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  ctx.fillStyle = Game.BG_COLOR;
	  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
	
	  ctx.fillStyle = "#50C878";
	  ctx.fillRect(0, 700, Game.DIM_X, 100);
	
	  this.playerOneTank.draw(ctx);
	  this.playerTwoTank.draw(ctx);
	  if (this.missile) {
	    this.missile.draw(ctx);
	  }
	};
	
	Game.prototype.handleUpKey = function () {
	  this.playerOneTank.barrelUp();
	};
	
	Game.prototype.handleDownKey = function () {
	  this.playerOneTank.barrelDown();
	};
	
	
	// Game.prototype.remove = function (object) {
	//
	// };
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Missile = __webpack_require__(4);
	
	var Tank = function (pos, barrelHeight, game) {
	  this.pos = pos;
	  this.barrelHeight = barrelHeight;
	  this.game = game;
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
	
	Tank.prototype.fireMissile = function () {
	  // var norm = Util.norm(this.vel);
	
	  // if (norm == 0) {
	  //   // Can't fire unless moving.
	  //   return;
	  // }
	  //
	  // var relVel = Util.scale(
	  //   Util.dir(this.vel),
	  //   Missile.SPEED
	  // );
	
	  // var missileVel = [
	  //   relVel[0] + this.vel[0], relVel[1] + this.vel[1]
	  // ];
	
	  var missile = new Missile({
	    pos: this.pos,
	    vel: [10, 10],
	    radius: [10],
	    color: "#505050",
	    game: this.game
	  });
	
	  this.game.add(missile);
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
	
	      case 32:
	      this.playerOneTank.fireMissile();
	      break;
	    }
	};
	
	GameView.prototype.start = function () {
	  this.bindKeyHandlers();
	  requestAnimationFrame(this.animate.bind(this));
	};
	
	GameView.prototype.animate = function () {
	  this.game.draw(this.ctx);
	  if (this.game.missile) {
	    this.game.missile.move();
	  }
	  requestAnimationFrame(this.animate.bind(this));
	};
	
	module.exports = GameView;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var Missile = function (options) {
	  this.pos = options.pos;
	  this.vel = options.vel;
	  this.radius = options.radius;
	  this.color = options.color;
	  this.game = options.game;
	};
	
	Missile.RADIUS = 2;
	Missile.SPEED = 15;
	
	Missile.prototype.draw = function (ctx) {
	  ctx.fillStyle = this.color;
	  ctx.beginPath();
	  ctx.arc(
	    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
	  );
	
	  ctx.fill();
	};
	
	Missile.prototype.move = function () {
	    this.pos[0] += this.vel[0];
	    this.pos[1] += this.vel[1];
	    // if (this.game.isOutOfBounds(this.pos)) {
	    //   this.remove();
	    // }
	};
	
	// Missile.prototype.remove = function () {
	//   this.game.remove(this);
	// };
	
	module.exports = Missile;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map