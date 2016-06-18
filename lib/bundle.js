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
	var GameView = __webpack_require__(5);
	
	
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
	var Util = __webpack_require__(4);
	var Para = __webpack_require__(6);
	
	var Game = function () {
	  this.playerOneTank = new Tank([100, Game.DIM_Y - 125], 45, 30, this);
	  this.playerTwoTank = new Tank([800, Game.DIM_Y - 125], 45, 30, this);
	  this.missile = null;
	  this.currentPlayer = "Player One";
	  this.isWon = false;
	  this.paras = [];
	};
	
	Game.BG_COLOR = "#4785F4";
	Game.DIM_X = 1000;
	Game.DIM_Y = 620;
	
	Game.prototype.addParas = function () {
	  setInterval(function () {
	    this.paras.push(new Para(this));
	  }.bind(this), 2000);
	};
	
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
	  ctx.fillRect(0, Game.DIM_Y - 100, Game.DIM_X, 100);
	
	  this.drawPlayerName(ctx);
	  this.playerOneTank.draw(ctx);
	  this.playerTwoTank.draw(ctx);
	  this.paras.forEach(function (para){
	    para.draw(ctx);
	  });
	  // this.paras.draw(ctx);
	  if (this.missile) {
	    this.missile.draw(ctx);
	  }
	};
	
	Game.prototype.drawPlayerName = function (ctx) {
	  if(this.currentPlayer) {
	    ctx.font = "48px sans-serif";
	    if (this.currentPlayer === "Player One") {
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
	  } else if (pos[1] > Game.DIM_Y - 85 || pos[1] < 0) {
	      return true;
	    }
	};
	
	Game.prototype.switchPlayers = function () {
	  if (this.currentPlayer === "Player One") {
	    this.currentPlayer = "Player Two";
	  } else {
	    this.currentPlayer = "Player One";
	  }
	};
	
	Game.prototype.checkForHit = function () {
	  if (this.missile === null) {
	    return;
	  }
	  var otherPlayerTank = this.currentPlayer === "Player One" ? this.playerTwoTank : this.playerOneTank;
	  if (Util.dist(this.missile.pos, otherPlayerTank.midPoint) < 20) {
	    this.handleHit();
	    this.missile = null;
	  }
	};
	
	Game.prototype.handleHit = function () {
	  this.isWon = true;
	};
	
	// Game.prototype.drawWinner = function (ctx) {
	//   ctx.font = "48px sans-serif";
	//   ctx.fillText("Player One Wins!", 350, 400);
	// };
	
	Game.prototype.remove = function (object) {
	  this.missile = null;
	};
	
	Game.prototype.removePara = function (para) {
	  this.paras.splice(this.paras.indexOf(para), 1);
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Missile = __webpack_require__(3);
	var Util = __webpack_require__(4);
	
	var Tank = function (pos, barrelAngle, barrelLength, game) {
	  this.pos = pos;
	  this.midPoint = [pos[0] + 20, pos[1] + 20];
	  // this.barrelX = barrelX;
	  // this.barrelY = barrelY;
	  this.game = game;
	  this.barrelAngle = barrelAngle;
	  this.barrelLength = barrelLength;
	  // this.barrelTipPos = [0, 0];
	};
	
	Tank.prototype.draw = function (ctx) {
	  ctx.fillStyle = "#666666";
	  ctx.fillRect(this.pos[0], this.pos[1], 40, 40);
	
	  var midPoint = [(this.pos[0] + 20), (this.pos[1] + 20)];
	  var cx = midPoint[0];
	  var cy = midPoint[1];
	  ctx.fillStyle = "#000000";
	
	  var barrelAngleRadians = (this.barrelAngle * Math.PI / 180);
	
	  var pos = Util.lineToAngle(cx, cy, this.barrelLength, barrelAngleRadians);
	  ctx.beginPath();
	  ctx.moveTo(cx, cy);
	  ctx.lineTo(pos.x, pos.y);
	  this.barrelTipPos = [pos.x, pos.y];
	  ctx.lineWidth = 3;
	  ctx.closePath();
	  ctx.stroke();
	
	  // ctx.beginPath();
	  // ctx.moveTo(midPoint, 520);
	  // ctx.lineTo(this.barrelX, 520 - this.barrelY);
	  // ctx.closePath();
	  // ctx.stroke();
	};
	
	Tank.prototype.barrelUp = function () {
	  if (this.game.currentPlayer === "Player One") {
	    this.barrelAngle += 5;
	  } else {
	    this.barrelAngle -= 5;
	  }
	};
	
	Tank.prototype.barrelDown = function () {
	  if (this.game.currentPlayer === "Player One") {
	    this.barrelAngle -= 5;
	  } else {
	    this.barrelAngle += 5;
	  }
	};
	
	Tank.prototype.fireMissile = function () {
	
	  // var barrelVel = [
	  //   this.barrelX - (this.pos[0] + 40), -this.barrelY
	  // ];
	  // var norm = Util.norm(this.vel);
	  // var norm = Util.norm(barrelVel);
	
	  // if (norm == 0) {
	  //   // Can't fire unless moving.
	  //   return;
	  // }
	  //
	  // var relVel = Util.scale(
	  //   // Util.dir(this.vel),
	  //   Util.dir(barrelVel),
	  //   Missile.SPEED
	  // );
	  // var missileVel = [];
	  // if (this.game.currentPlayer === "Player One") {
	  //   missileVel = [
	  //     (relVel[0] + this.barrelX) / 20, (relVel[1] - this.barrelY) / 6
	  //   ];
	  // } else {
	  //   missileVel = [
	  //     -(relVel[0] + this.barrelX) / 100, (relVel[1] - this.barrelY) / 6
	  //   ];
	  // }
	  // var missileVel = [
	  //   this.barrelX - this.pos[0], this.barrelY - this.pos[1]
	  // ];
	  var missilePosX = this.barrelTipPos[0];
	  var missilePosY = this.barrelTipPos[1];
	  var initialVel = [];
	  if (this.game.currentPlayer === "Player One") {
	    initialVel = [missilePosX - (this.pos[0] + 20), missilePosY - (this.pos[1] + 20)];
	  } else {
	    initialVel = [(missilePosX - (this.pos[0] + 20)), missilePosY - (this.pos[1] + 20)];
	  }
	
	  var missile = new Missile({
	    pos: [missilePosX, missilePosY],
	    vel: [initialVel[0] / 3, initialVel[1] / 3],
	    acc: 0.10,
	    radius: [5],
	    color: "#B0171F",
	    game: this.game
	  });
	  this.game.add(missile);
	};
	
	module.exports = Tank;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(4);
	
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
	    this.checkParaHits();
	    if (this.game.isOutOfBounds(this.pos)) {
	      this.remove();
	      this.game.switchPlayers();
	    }
	};
	
	Missile.prototype.checkParaHits = function () {
	  var self = this;
	  this.game.paras.forEach(function (para) {
	    if (Util.dist(para.pos, self.pos) < 40) {
	      self.game.removePara(para);
	      self.remove();
	      self.game.switchPlayers();
	    }
	  });
	};
	
	Missile.prototype.remove = function () {
	  this.game.missile = null;
	};
	
	module.exports = Missile;


/***/ },
/* 4 */
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
	  },
	
	  lineToAngle: function(x, y, length, angle) {
	  return {
	      x: x + length * Math.cos(angle),
	      y: y + length * Math.sin(angle)
	  };
	  }
	};
	
	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);
	
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
	  if (this.game.currentPlayer === "Player One") {
	    currentTank = this.playerOneTank;
	  } else {
	    currentTank = this.playerTwoTank;
	  }
	    switch (e.keyCode) {
	      case 40:
	      e.preventDefault();
	      currentTank.barrelUp();
	      break;
	
	      case 38:
	      e.preventDefault();
	      currentTank.barrelDown();
	      break;
	
	      case 32:
	      e.preventDefault();
	      if (this.game.missile !== null) {
	        return;
	      }
	      currentTank.fireMissile();
	      break;
	    }
	};
	
	GameView.prototype.start = function () {
	  this.bindKeyHandlers();
	  this.game.addParas();
	  requestAnimationFrame(this.animate.bind(this));
	};
	
	GameView.prototype.animate = function () {
	  if (this.game.isWon === false) {
	    this.game.draw(this.ctx);
	    if (this.game.missile) {
	      this.game.missile.move();
	      this.game.checkForHit();
	    }
	    this.game.paras.forEach(function (para) {
	      para.move();
	    });
	    requestAnimationFrame(this.animate.bind(this));
	  } else {
	    var winner = this.game.currentPlayer;
	    setTimeout(function() {
	      this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	      this.ctx.fillStyle = "#000000";
	      this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
	      this.ctx.font = "48px sans-serif";
	      this.ctx.fillStyle = "#00ff00";
	      this.ctx.fillText(winner.toString() + " Wins!", 350, 400);
	    }.bind(this), 2000);
	  }
	};
	
	module.exports = GameView;


/***/ },
/* 6 */
/***/ function(module, exports) {

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
	  this.pos[1] += 2;
	  if (this.game.isOutOfBounds(this.pos)) {
	    this.game.removePara(this);
	  }
	};
	
	// Para.prototype.remove = function () {
	//
	// };
	
	module.exports = Para;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map