var Util = {

  dir: function (vec) {
    var norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  },

  dist: function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },

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
