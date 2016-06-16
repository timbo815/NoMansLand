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
	var GameView = __webpack_require__(4);
	
	
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
	var Util = __webpack_require__(5);
	
	var Game = function () {
	  this.playerOneTank = new Tank([100, 675], 150, 40, this);
	  this.playerTwoTank = new Tank([800, 675], 790, 40, this);
	  this.missile = null;
	  this.currentPlayer = "playerOne";
	};
	
	Game.BG_COLOR = "#4785F4";
	Game.DIM_X = 1000;
	Game.DIM_Y = 800;
	
	Game.prototype.add = function(missile) {
	  this.missile = missile;
	};
	
	// Game.prototype.promptMove = function () {
	//
	// };
	
	Game.prototype.draw = function (ctx) {
	
	  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  ctx.fillStyle = Game.BG_COLOR;
	  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
	
	  ctx.fillStyle = "#50C878";
	  ctx.fillRect(0, 700, Game.DIM_X, 100);
	
	  this.drawPlayerName(ctx);
	  this.playerOneTank.draw(ctx);
	  this.playerTwoTank.draw(ctx);
	  if (this.missile) {
	    this.missile.draw(ctx);
	  }
	};
	
	Game.prototype.drawPlayerName = function (ctx) {
	  if(this.currentPlayer) {
	    ctx.font = "48px sans-serif";
	    if (this.currentPlayer === "playerOne") {
	      ctx.fillText("Player One!", 350, 400);
	    } else {
	      ctx.fillText("Player Two!", 350, 400);
	    }
	  }
	};
	
	Game.prototype.handleUpKey = function () {
	  this.playerOneTank.barrelUp();
	};
	
	Game.prototype.handleDownKey = function () {
	  this.playerOneTank.barrelDown();
	};
	
	Game.prototype.isOutOfBounds = function (pos) {
	  if (pos[0] > Game.DIM_X || pos[0] < 0) {
	    return true;
	  } else if (pos[1] > Game.DIM_Y || pos[1] < 0) {
	      return true;
	    }
	};
	
	Game.prototype.switchPlayers = function () {
	  if (this.currentPlayer === "playerOne") {
	    this.currentPlayer = "playerTwo";
	  } else {
	    this.currentPlayer = "playerOne";
	  }
	};
	
	Game.prototype.checkForHit = function (ctx) {
	  if (this.missile === null) {
	    return;
	  }
	  var otherPlayerTank = this.currentPlayer === "playerOne" ? this.playerTwoTank : this.playerOneTank;
	  if (Util.dist(this.missile.pos, otherPlayerTank.midPoint) < 20) {
	    this.handleHit(ctx);
	    this.missile = null;
	  }
	};
	
	Game.prototype.handleHit = function (ctx) {
	  this.currentPlayer = null;
	  window.setInterval(
	    this.drawWinner(ctx), 100
	  );
	};
	
	Game.prototype.drawWinner = function (ctx) {
	  ctx.font = "48px sans-serif";
	  ctx.fillText("Player One Wins!", 350, 400);
	};
	
	Game.prototype.remove = function (object) {
	  this.missile = null;
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Missile = __webpack_require__(3);
	var Util = __webpack_require__(5);
	
	var Tank = function (pos, barrelX, barrelY, game) {
	  this.pos = pos;
	  this.midPoint = [pos[0] + 20, pos[1] + 20];
	  this.barrelX = barrelX;
	  this.barrelY = barrelY;
	  this.game = game;
	};
	
	Tank.prototype.draw = function (ctx) {
	  ctx.fillStyle = "#666666";
	  ctx.fillRect(this.pos[0], this.pos[1], 40, 40);
	
	  var midPoint = (this.pos[0] + 20);
	
	  ctx.fillStyle = "#000000";
	  ctx.beginPath();
	  ctx.moveTo(midPoint, 700);
	  ctx.lineTo(this.barrelX, 700 - this.barrelY);
	  ctx.closePath();
	  ctx.stroke();
	};
	
	Tank.prototype.barrelUp = function () {
	  this.barrelY -= 2;
	};
	
	Tank.prototype.barrelDown = function () {
	  this.barrelY += 2;
	};
	
	Tank.prototype.fireMissile = function () {
	  var barrelVel = [
	    this.barrelX - (this.pos[0] + 40), -this.barrelY
	  ];
	  // var norm = Util.norm(this.vel);
	  var norm = Util.norm(barrelVel);
	
	  // if (norm == 0) {
	  //   // Can't fire unless moving.
	  //   return;
	  // }
	  //
	  var relVel = Util.scale(
	    // Util.dir(this.vel),
	    Util.dir(barrelVel),
	    Missile.SPEED
	  );
	  var missileVel = [];
	  if (this.game.currentPlayer === "playerOne") {
	    missileVel = [
	      (relVel[0] + this.barrelX) / 20, (relVel[1] - this.barrelY) / 6
	    ];
	  } else {
	    missileVel = [
	      -(relVel[0] + this.barrelX) / 100, (relVel[1] - this.barrelY) / 6
	    ];
	  }
	  // var missileVel = [
	  //   this.barrelX - this.pos[0], this.barrelY - this.pos[1]
	  // ];
	
	  var missile = new Missile({
	    pos: [this.barrelX, 700 - this.barrelY],
	    vel: missileVel,
	    acc: 0.2,
	    radius: [5],
	    color: "#B0171F",
	    game: this.game
	  });
	  this.game.add(missile);
	};
	
	module.exports = Tank;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var Missile = function (options) {
	  this.pos = options.pos;
	  this.vel = options.vel;
	  this.acc = options.acc;
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
	    this.vel[1] += this.acc;
	    this.pos[0] += this.vel[0];
	    this.pos[1] += this.vel[1];
	    if (this.game.isOutOfBounds(this.pos)) {
	      this.remove();
	      this.game.switchPlayers();
	    }
	};
	
	Missile.prototype.remove = function () {
	  this.game.missile = null;
	};
	
	module.exports = Missile;


/***/ },
/* 4 */
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
	    this.game.checkForHit(this.ctx);
	  }
	  requestAnimationFrame(this.animate.bind(this));
	};
	
	module.exports = GameView;


/***/ },
/* 5 */
/***/ function(module, exports) {

	var Util = {
	  // Normalize the length of the vector to 1, maintaining direction.
	  dir: function (vec) {
	    var norm = Util.norm(vec);
	    return Util.scale(vec, 1 / norm);
	  },
	  // Find distance between two points.
	  dist: function (pos1, pos2) {
	    return Math.sqrt(
	      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
	    );
	  },
	  // Find the length of the vector.
	  norm: function (vec) {
	    return Util.dist([0, 0], vec);
	  },
	
	  scale: function (vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  }
	};
	
	module.exports = Util;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map