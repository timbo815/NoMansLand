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
	  this.playerOneTank = new Tank([100, Game.DIM_Y - 125], 45, 35, this, "Player One");
	  this.playerTwoTank = new Tank([800, Game.DIM_Y - 125], 135, 35, this, "Player Two");
	  this.missiles = [];
	  this.isWon = false;
	  this.winner = "";
	  this.paras = [];
	};
	
	Game.BG_COLOR = "#4785F4";
	Game.DIM_X = 1000;
	Game.DIM_Y = 620;
	
	Game.prototype.addParas = function () {
	  setInterval(function () {
	    this.paras.push(new Para(this));
	  }.bind(this), 300);
	};
	
	Game.prototype.addMissile = function(missile) {
	  this.missiles.push(missile);
	};
	
	Game.prototype.draw = function (ctx) {
	
	  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  ctx.fillStyle = Game.BG_COLOR;
	  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
	
	  ctx.fillStyle = "#50C878";
	  ctx.fillRect(0, Game.DIM_Y - 100, Game.DIM_X, 100);
	
	  this.drawTitle(ctx);
	  this.playerOneTank.draw(ctx);
	  this.playerTwoTank.draw(ctx);
	  this.paras.forEach(function (para){
	    para.draw(ctx);
	  });
	  this.missiles.forEach(function (missile) {
	    missile.draw(ctx);
	  });
	};
	
	Game.prototype.drawTitle = function(ctx) {
	  ctx.font = "48px sans-serif";
	  ctx.fillStyle = "#BD1E06";
	  ctx.fillText("NoMansLand", 350, 100);
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
	
	  var self = this;
	  this.missiles.forEach(function (missile) {
	    if (Util.dist(missile.pos, self.playerOneTank.midPoint) < 20) {
	      self.handleHit("Player Two");
	    } else if (Util.dist(missile.pos, self.playerTwoTank.midPoint) < 20) {
	      self.handleHit("Player One");
	    }
	  });
	};
	
	Game.prototype.handleHit = function (winner) {
	  this.isWon = true;
	  this.winner = winner;
	};
	
	
	Game.prototype.removeMissile = function (missile) {
	  this.missiles.splice(this.missiles.indexOf(missile), 1);
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
	
	var Tank = function (pos, barrelAngle, barrelLength, game, player) {
	  this.pos = pos;
	  this.midPoint = [pos[0] + 20, pos[1] + 20];
	  this.game = game;
	  this.barrelAngle = barrelAngle;
	  this.barrelLength = barrelLength;
	  this.player = player;
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
	
	  var missilePosX = this.barrelTipPos[0];
	  var missilePosY = this.barrelTipPos[1];
	  var initialVel = [];
	  var color = "";
	  if (this.player === "Player One") {
	    initialVel = [missilePosX - (this.pos[0] + 20), missilePosY - (this.pos[1] + 20)];
	    color = "#B0171F";
	  } else {
	    initialVel = [(missilePosX - (this.pos[0] + 20)), missilePosY - (this.pos[1] + 20)];
	    color = "#F7E345";
	  }
	
	  var missile = new Missile({
	    pos: [missilePosX, missilePosY],
	    vel: [initialVel[0] / 3, initialVel[1] / 3],
	    acc: 0.10,
	    radius: [5],
	    color: color,
	    game: this.game
	  });
	  this.game.addMissile(missile);
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
	      this.game.removeMissile(this);
	    }
	};
	
	Missile.prototype.checkParaHits = function () {
	  var self = this;
	  this.game.paras.forEach(function (para) {
	    if (Util.dist(para.pos, self.pos) < 40) {
	      self.game.removePara(para);
	      self.game.removeMissile(self);
	    }
	  });
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
	  this.winner = null;
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
	      case 87:
	      e.preventDefault();
	      this.playerOneTank.barrelUp();
	      break;
	
	      case 83:
	      e.preventDefault();
	      this.playerOneTank.barrelDown();
	      break;
	
	      case 68:
	      e.preventDefault();
	      // if (this.game.missile !== null) {
	      //   return;
	      // }
	      this.playerOneTank.fireMissile();
	      break;
	
	      case 40:
	      e.preventDefault();
	      this.playerTwoTank.barrelUp();
	      break;
	
	      case 38:
	      e.preventDefault();
	      this.playerTwoTank.barrelDown();
	      break;
	
	      case 37:
	      e.preventDefault();
	      this.playerTwoTank.fireMissile();
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
	    this.game.missiles.forEach(function (missile) {
	      missile.move();
	      missile.game.checkForHit();
	    });
	
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
	      this.ctx.fillStyle = "#50C878";
	      this.ctx.fillText(this.game.winner.toString() + " Wins!", 200, 400);
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
	
	module.exports = Para;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map