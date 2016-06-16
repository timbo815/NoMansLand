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
